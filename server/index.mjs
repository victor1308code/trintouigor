import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const PORT = process.env.PORT || 4200;
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const dbPath = path.join(DATA_DIR, 'trintou.db');
const db = new DatabaseSync(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    photo_id TEXT NOT NULL,
    author TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS likes (
    photo_id TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS deleted_photos (
    photo_id TEXT PRIMARY KEY,
    deleted_at TEXT NOT NULL
  );
`);

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(payload);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  try {
    // Healthcheck
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(res, 200, { status: 'ok', time: new Date().toISOString() });
    }

    // GET /api/comments
    if (pathname === '/api/comments' && req.method === 'GET') {
      const stmt = db.prepare('SELECT id, photo_id as photoId, author, text, created_at as createdAt FROM comments ORDER BY ROWID DESC');
      const comments = stmt.all();
      return sendJson(res, 200, comments);
    }

    // POST /api/comments
    if (pathname === '/api/comments' && req.method === 'POST') {
      const body = await parseBody(req);
      const { photoId, author, text } = body;
      if (!photoId || !author?.trim() || !text?.trim()) {
        return sendJson(res, 400, { error: 'Campos incompletos' });
      }

      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      const createdAt = new Date().toISOString();

      const stmt = db.prepare('INSERT INTO comments (id, photo_id, author, text, created_at) VALUES (?, ?, ?, ?, ?)');
      stmt.run(id, String(photoId), author.trim(), text.trim(), createdAt);

      return sendJson(res, 201, {
        id,
        photoId: String(photoId),
        author: author.trim(),
        text: text.trim(),
        createdAt,
      });
    }

    // GET /api/likes
    if (pathname === '/api/likes' && req.method === 'GET') {
      const stmt = db.prepare('SELECT photo_id as photoId, count FROM likes');
      const rows = stmt.all();
      const likesMap = {};
      for (const row of rows) {
        likesMap[row.photoId] = row.count;
      }
      return sendJson(res, 200, likesMap);
    }

    // POST /api/likes
    if (pathname === '/api/likes' && req.method === 'POST') {
      const body = await parseBody(req);
      const { photoId } = body;
      if (!photoId) {
        return sendJson(res, 400, { error: 'photoId é obrigatório' });
      }

      const updateStmt = db.prepare(`
        INSERT INTO likes (photo_id, count)
        VALUES (?, 1)
        ON CONFLICT(photo_id) DO UPDATE SET count = count + 1
      `);
      updateStmt.run(String(photoId));

      const getStmt = db.prepare('SELECT count FROM likes WHERE photo_id = ?');
      const row = getStmt.get(String(photoId));

      return sendJson(res, 200, { photoId: String(photoId), count: row?.count || 1 });
    }

    // GET /api/deleted-photos
    if (pathname === '/api/deleted-photos' && req.method === 'GET') {
      const stmt = db.prepare('SELECT photo_id as photoId FROM deleted_photos');
      const rows = stmt.all();
      return sendJson(res, 200, rows.map(r => String(r.photoId)));
    }

    // POST /api/deleted-photos
    if (pathname === '/api/deleted-photos' && req.method === 'POST') {
      const body = await parseBody(req);
      const { photoId } = body;
      if (!photoId) {
        return sendJson(res, 400, { error: 'photoId é obrigatório' });
      }
      const stmt = db.prepare(`
        INSERT INTO deleted_photos (photo_id, deleted_at)
        VALUES (?, ?)
        ON CONFLICT(photo_id) DO UPDATE SET deleted_at = ?
      `);
      const now = new Date().toISOString();
      stmt.run(String(photoId), now, now);
      return sendJson(res, 200, { success: true, photoId: String(photoId) });
    }

    // POST /api/deleted-photos/restore-all
    if (pathname === '/api/deleted-photos/restore-all' && req.method === 'POST') {
      db.exec('DELETE FROM deleted_photos');
      return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error('Server error:', err);
    return sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
