# 🔧 Resolver Erro 403 no Hostinger - Guia Completo

Baseado nas recomendações do suporte Hostinger, siga este checklist para resolver o erro 403.

## ✅ Checklist de Verificação

### 1. Permissões de Arquivos e Pastas

**Problema:** Arquivos sem permissões corretas.

**Solução:**

**Via SSH (se tiver acesso):**
```bash
# Conectar via SSH ao servidor Hostinger
ssh usuario@seu-servidor.hostinger.com

# Ir para o diretório do app
cd /caminho/do/app

# Ajustar permissões de pastas (755)
find . -type d -exec chmod 755 {} \;

# Ajustar permissões de arquivos (644)
find . -type f -exec chmod 644 {} \;

# Dar permissão de execução para scripts
chmod +x scripts/*.js
chmod +x scripts/*.sh
```

**Via File Manager (hPanel):**
1. Acesse **Files** → **File Manager**
2. Navegue até a pasta do Node.js app
3. Selecione todas as pastas
4. Clique com botão direito → **Change Permissions**
5. Defina: **755** para pastas
6. Selecione todos os arquivos
7. Clique com botão direito → **Change Permissions**
8. Defina: **644** para arquivos

---

### 2. App Root & Startup File

**Problema:** Caminho raiz ou arquivo de inicialização incorreto.

**Solução:**

**No hPanel (Node.js Web App):**

1. Abra a **Node.js Web App**
2. Procure por **"Root Directory"** ou **"Application Path"**
3. Verifique se está correto:
   - Se o repositório está na raiz: deixe **vazio** ou coloque **`.`**
   - Se o app está em subpasta: coloque o caminho (ex: `apps/website`)

4. Procure por **"Start Command"** ou **"Start Script"**
5. Verifique se está:
   ```
   npm run start:hostinger
   ```
   OU
   ```
   npm start
   ```

**Verificar estrutura do projeto:**
- O `package.json` deve estar na raiz do repositório
- O script `start:hostinger` deve existir no `package.json`

---

### 3. Domain Mapping (Mapeamento de Domínio)

**Problema:** Domínio ainda apontando para app PHP antigo.

**Solução:**

1. **Verificar onde o domínio está:**
   - Vá em **Websites** → veja todos os sites/apps
   - Verifique se `www.senior-floors.com` está no **Node.js app** ou no **site PHP**

2. **Se estiver no site PHP:**
   - Remova `www.senior-floors.com` do site PHP
   - Adicione ao Node.js app

3. **Adicionar ao Node.js app:**
   - Abra o **Node.js Web App**
   - Vá em **Domain** ou **Connect Domain**
   - Adicione: `www.senior-floors.com`
   - Salve

4. **Aguardar propagação DNS** (alguns minutos a 24h)

---

### 4. App Listening Port (Porta do App)

**Problema:** App não está escutando na porta correta.

**Solução:**

**Verificar variável de ambiente PORT:**

No hPanel, na **Node.js Web App**, adicione variável de ambiente:

```
PORT=3000
```

**OU** se o Hostinger usar outra porta, verifique qual porta está configurada e ajuste.

**Verificar no código:**

O Next.js geralmente usa a porta do `process.env.PORT` ou padrão 3000. Certifique-se de que o `next.config.js` não força uma porta específica.

**No `package.json`, o script `start:hostinger` deve ser:**
```json
"start:hostinger": "next start"
```

Isso faz o Next.js usar a porta do `process.env.PORT` automaticamente.

---

### 5. Limpar Cache

**Problema:** Cache antigo causando conflitos.

**Solução:**

**No hPanel:**
1. Na **Node.js Web App**, procure por **"Clear Cache"** ou **"Purge Cache"**
2. Clique para limpar

**No navegador:**
1. Pressione `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
2. Limpe cache e cookies
3. Ou teste em **modo anônimo/privado**

**Limpar build antigo:**
1. No File Manager, delete a pasta `.next` (se existir)
2. Faça um novo deploy

---

## 🔍 Diagnóstico Passo a Passo

### Passo 1: Verificar Logs

**No hPanel:**
1. Abra o **Node.js Web App**
2. Vá em **Logs** ou **View Logs**
3. Procure por erros relacionados a:
   - Permissões
   - Porta
   - Arquivo não encontrado

### Passo 2: Verificar Estrutura do Projeto

**Confirme que:**
- `package.json` está na raiz
- Script `start:hostinger` existe
- Pasta `.next` foi criada após build

### Passo 3: Testar URL Temporária

**Se o app tiver URL temporária (ex: `app-123456.hostinger.com`):**
1. Acesse essa URL diretamente
2. Se funcionar: problema é apenas no domínio
3. Se não funcionar: problema está no app

---

## 🛠️ Solução Completa (Reset)

Se nada funcionar, faça um reset completo:

### 1. Verificar Configuração no hPanel

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm run start:hostinger
```

**Output Directory:**
```
.next
```

**Root Directory:**
```
.
```
(ou deixe vazio)

### 2. Variáveis de Ambiente

Certifique-se de ter todas configuradas:
```
DATABASE_URL=mysql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://www.senior-floors.com
NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com
PORT=3000
```

### 3. Fazer Novo Deploy

1. No hPanel, clique em **Redeploy** ou **Deploy**
2. Aguarde o build terminar
3. Verifique os logs para erros

### 4. Verificar Permissões (via SSH)

Se tiver acesso SSH:
```bash
# Conectar
ssh usuario@servidor.hostinger.com

# Ir para o app
cd /caminho/do/app

# Ajustar permissões
chmod -R 755 .
find . -type f -exec chmod 644 {} \;
chmod +x scripts/*.js 2>/dev/null || true
```

---

## 📋 Checklist Final

Antes de contatar suporte novamente, confirme:

- [ ] Permissões: pastas 755, arquivos 644
- [ ] Root Directory: correto (`.` ou vazio)
- [ ] Start Command: `npm run start:hostinger`
- [ ] Domain: `www.senior-floors.com` está no Node.js app (não no PHP)
- [ ] PORT: variável de ambiente configurada
- [ ] Cache: limpo no hPanel e navegador
- [ ] Build: último deploy foi bem-sucedido
- [ ] Logs: verificado e sem erros críticos

---

## 🆘 Se Ainda Não Funcionar

**Informações para o suporte Hostinger:**

1. **Erro específico:** 403 Forbidden
2. **O que já foi verificado:**
   - Permissões ajustadas (755/644)
   - Root Directory: `.`
   - Start Command: `npm run start:hostinger`
   - Domain mapeado para Node.js app
   - PORT configurado
   - Cache limpo
3. **Logs de erro:** (copie os logs do hPanel)
4. **URL temporária do app:** (se tiver)
5. **Repositório:** `https://github.com/nakazone/senior-floors.git`

---

## 🔧 Comandos Úteis para Verificar

**Verificar se app está rodando:**
```bash
# Via SSH (se tiver acesso)
ps aux | grep node
netstat -tulpn | grep :3000
```

**Verificar permissões:**
```bash
ls -la
# Deve mostrar: drwxr-xr-x para pastas, -rw-r--r-- para arquivos
```

**Verificar variáveis de ambiente:**
```bash
# No terminal do hPanel (se disponível)
echo $PORT
echo $DATABASE_URL
```

---

**Última atualização:** Guia para resolver erro 403 baseado em recomendações do suporte Hostinger
