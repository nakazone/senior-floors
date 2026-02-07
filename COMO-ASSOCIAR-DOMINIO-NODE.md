# 🔗 Como Associar o Domínio ao Node.js App no Hostinger

Este guia mostra passo a passo como fazer o domínio `www.senior-floors.com` apontar para o **Node.js Web App** ao invés do site antigo (PHP).

## ⚠️ Problema

Se você acessa `https://www.senior-floors.com` e ainda vê o **site antigo (PHP)**, significa que o domínio está associado ao **alojamento antigo** (`public_html`), não ao **Node.js Web App**.

## ✅ Solução: Associar Domínio ao Node.js App

### Passo 1: Acessar o hPanel da Hostinger

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login com suas credenciais

### Passo 2: Localizar o Node.js Web App

1. No menu lateral, vá em **Websites** (ou **Sites**)
2. Procure por **Node.js Web App** ou **Web Apps**
3. Você deve ver:
   - O **site antigo** (ex.: `senior-floors.com` / `public_html`)
   - A **Node.js Web App** onde você fez deploy do repositório Git

### Passo 3: Abrir a Node.js Web App

1. Clique na **Node.js Web App** que você criou
2. Procure por uma seção chamada:
   - **Domain** / **Domínio**
   - **Application URL**
   - **Connect custom domain**
   - **Custom Domain**

### Passo 4: Conectar o Domínio

**Opção A: Se houver botão "Add domain" ou "Connect custom domain"**

1. Clique em **Add domain** ou **Connect custom domain**
2. Digite: `www.senior-floors.com`
3. (Opcional) Adicione também: `senior-floors.com` (para redirecionar para www)
4. Clique em **Save** ou **Connect**
5. Aguarde alguns minutos (ou até 24h se a Hostinger indicar propagação DNS)

**Opção B: Se o domínio já estiver atribuído ao site antigo**

1. Primeiro, **remova o domínio do site antigo**:
   - Vá em **Websites** → encontre o site antigo (public_html)
   - Clique nos **três pontos** (⋮) ao lado do site
   - Selecione **Alterar domínio** ou **Change domain**
   - Remova ou altere o domínio para outro (ex.: `old.senior-floors.com`)

2. Depois, **adicione o domínio ao Node.js app**:
   - Volte para a **Node.js Web App**
   - Clique em **Add domain** ou **Connect custom domain**
   - Digite: `www.senior-floors.com`
   - Clique em **Save**

### Passo 5: Verificar Variáveis de Ambiente

Após conectar o domínio, verifique se as variáveis de ambiente estão corretas:

1. Na **Node.js Web App**, vá em **Environment Variables** ou **Variáveis de Ambiente**
2. Confirme que estão configuradas:
   - `NEXTAUTH_URL` = `https://www.senior-floors.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com`
   - `DATABASE_URL` = URL do MySQL
   - `NEXTAUTH_SECRET` = chave aleatória

### Passo 6: Aguardar Propagação DNS

- Pode levar de **alguns minutos a 24 horas** para o DNS propagar
- A Hostinger geralmente mostra uma mensagem indicando o tempo estimado

### Passo 7: Testar

1. Acesse: `https://www.senior-floors.com`
2. Se aparecer o **novo site Next.js**, funcionou! ✅
3. Se ainda aparecer o **site antigo**, aguarde mais tempo ou verifique novamente

---

## 🔧 Alternativas (se não conseguir conectar o domínio)

### Opção 1: Usar um Subdomínio

Se o painel não permitir conectar o domínio principal, use um **subdomínio**:

1. No painel da Hostinger, crie um **subdomínio**:
   - Exemplo: `novo.senior-floors.com` ou `app.senior-floors.com`
2. Associe esse subdomínio ao **Node.js Web App**
3. Atualize as variáveis de ambiente:
   - `NEXTAUTH_URL` = `https://novo.senior-floors.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://novo.senior-floors.com`

### Opção 2: Contatar Suporte Hostinger

Se nenhuma das opções acima funcionar:

1. Entre em contato com o **Suporte Hostinger**
2. Peça para associar `www.senior-floors.com` ao **Node.js Web App** em vez do site em `public_html`
3. Explique que você quer que o domínio principal aponte para a aplicação Node.js

**Link de referência Hostinger:** [Connect a custom domain to your web app](https://www.hostinger.com/in/tutorials/connect-custom-domain-to-web-app)

---

## 📋 Checklist

- [ ] Acessei o hPanel da Hostinger
- [ ] Localizei a Node.js Web App
- [ ] Encontrei a opção "Connect custom domain" ou similar
- [ ] Adicionei `www.senior-floors.com` ao Node.js app
- [ ] Verifiquei as variáveis de ambiente (`NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Aguardei a propagação DNS
- [ ] Testei acessando `https://www.senior-floors.com`

---

## ❓ Problemas Comuns

### "O domínio já está em uso"

**Solução:** Remova o domínio do site antigo primeiro (Passo 4, Opção B)

### "Não vejo a opção de conectar domínio"

**Solução:** 
- Verifique se você está no plano correto (alguns planos não permitem)
- Tente usar um subdomínio (Opção 1 acima)
- Contate o suporte Hostinger

### "Ainda mostra o site antigo após conectar"

**Solução:**
- Aguarde mais tempo (DNS pode levar até 24h)
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Teste em modo anônimo
- Verifique se as variáveis de ambiente estão corretas

---

**Última atualização:** Baseado na documentação do projeto e guias da Hostinger
