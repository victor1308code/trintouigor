# Trintou do Igor • O Glorioso 4:20 🌿🎉

Site comemorativo oficial do aniversário de 30 anos do Igor (24 de Outubro de 2026).

## 🚀 Servidor & Deploy em Produção (Oracle Cloud)

- **Endereço IP:** [http://163.176.182.182](http://163.176.182.182)
- **Domínio DuckDNS:** `https://trintouigor.duckdns.org` (com SSL/HTTPS automático via Caddy)
- **Web Server:** Caddy com suporte a SPA (`try_files {path} /index.html`)

### 🔄 Auto-Deploy Contínuo (Sincronização Automática)
Sempre que você commitar e der push no Git (`git push origin main`):
1. **Hook local (`.git/hooks/pre-push`):** Dispara a atualização imediata via SSH no servidor.
2. **Auto-Sync do Servidor (`/home/ubuntu/sync_trintou.sh`):** O servidor checa a cada 60 segundos por novos commits no GitHub. Se houver novidades, ele faz `git pull`, `npm run build` e recarrega o Caddy automaticamente em segundo plano.
3. **Deploy Manual:** Se preferir rodar manualmente a qualquer instante:
   ```bash
   npm run deploy:oracle
   ```

## 🛠️ Tecnologias
- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4**
- **Motion (Framer Motion v14)**
- **Canvas-Confetti** (com silhueta vetorial SVG da folha de maconha)
- **Caddy Web Server** (Reverse Proxy & Static Files com HTTPS automático)
