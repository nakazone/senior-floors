# 🔍 Diagnóstico: Site ainda mostra PHP ao invés de Node.js

Se `www.senior-floors.com` ainda mostra o site antigo (PHP), siga este checklist:

## ✅ Checklist de Verificação

### 1. Verificar se o Node.js App está rodando

**No painel Hostinger:**
1. Vá em **Websites** → **Node.js Web App**
2. Verifique se o app está **Online** ou **Running**
3. Veja os **logs** para verificar se há erros
4. Confirme que o último **deploy** foi bem-sucedido

**Se o app não estiver rodando:**
- Verifique os logs de erro
- Confirme que as variáveis de ambiente estão configuradas
- Faça um novo deploy

### 2. Verificar qual domínio está associado ao Node.js App

**No painel Hostinger:**
1. Abra a **Node.js Web App**
2. Procure por **Domain** ou **Application URL**
3. Veja qual domínio está listado

**Se não houver domínio associado:**
- Siga o guia `COMO-ASSOCIAR-DOMINIO-NODE.md`
- Adicione `www.senior-floors.com` ao Node.js app

**Se houver outro domínio (ex: `app.senior-floors.com`):**
- O domínio principal ainda está no site antigo
- Você precisa remover o domínio do site antigo primeiro

### 3. Verificar qual domínio está associado ao site antigo (PHP)

**No painel Hostinger:**
1. Vá em **Websites** → encontre o site antigo (geralmente mostra `public_html`)
2. Veja qual domínio está associado a ele
3. Se for `www.senior-floors.com`, esse é o problema!

**Solução:**
- Remova `www.senior-floors.com` do site antigo
- Adicione ao Node.js app

### 4. Verificar DNS e propagação

**Teste direto do Node.js app:**
1. No painel, veja se o Node.js app tem uma URL temporária (ex: `app-123456.hostinger.com`)
2. Acesse essa URL diretamente
3. Se funcionar, o problema é apenas a associação do domínio

**Se a URL temporária não funcionar:**
- O problema está no deploy do Node.js app
- Verifique logs e variáveis de ambiente

### 5. Limpar cache do navegador

1. Pressione `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
2. Limpe cache e cookies
3. Ou teste em **modo anônimo/privado**

### 6. Verificar se há múltiplos sites/configurações conflitantes

**No painel Hostinger:**
1. Liste todos os **Websites** e **Node.js Apps**
2. Veja se há conflitos de domínio
3. Um domínio só pode estar em um lugar por vez

---

## 🚨 Problemas Comuns e Soluções

### Problema 1: Domínio ainda no site antigo

**Sintoma:** `www.senior-floors.com` mostra PHP

**Solução:**
1. Remova `www.senior-floors.com` do site antigo (public_html)
2. Adicione `www.senior-floors.com` ao Node.js app
3. Aguarde propagação DNS (alguns minutos a 24h)

### Problema 2: Node.js app não está rodando

**Sintoma:** App mostra erro ou está offline

**Solução:**
1. Verifique logs no painel
2. Confirme variáveis de ambiente (`DATABASE_URL`, `NEXTAUTH_SECRET`, etc.)
3. Faça redeploy
4. Verifique se o build foi bem-sucedido

### Problema 3: Plano não permite conectar domínio ao Node.js app

**Sintoma:** Não aparece opção "Connect custom domain" no Node.js app

**Solução:**
- Use um **subdomínio** (ex: `novo.senior-floors.com`)
- Ou contate suporte Hostinger para associar o domínio principal

### Problema 4: DNS ainda não propagou

**Sintoma:** Fez tudo certo mas ainda mostra PHP

**Solução:**
- Aguarde mais tempo (pode levar até 24h)
- Teste de outro dispositivo/rede
- Use ferramenta de verificação DNS: https://dnschecker.org

---

## 📞 Próximos Passos

1. **Verifique cada item do checklist acima**
2. **Anote o que encontrou** (qual domínio está onde)
3. **Se não conseguir resolver:**
   - Contate suporte Hostinger
   - Explique que quer associar `www.senior-floors.com` ao Node.js Web App
   - Peça ajuda para remover do site antigo e adicionar ao Node.js app

---

## 🔧 Comandos Úteis para Verificar

**Testar se o Node.js app está acessível:**
```bash
# Se tiver URL temporária do app, teste diretamente
curl https://app-123456.hostinger.com
```

**Verificar DNS:**
```bash
# Ver para onde o domínio aponta
nslookup www.senior-floors.com
```

---

**Última atualização:** Guia de diagnóstico para resolver problema de domínio
