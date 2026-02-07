# 🔄 Soluções Alternativas: Domínio Ainda Mostra PHP

Se `www.senior-floors.com` ainda mostra o site PHP mesmo após criar o Node.js app, aqui estão soluções alternativas:

## 🎯 Solução 1: Usar Subdomínio (MAIS FÁCIL)

### Criar Subdomínio para o Novo Site

**Vantagem:** Não precisa mexer no domínio principal, funciona imediatamente.

**Passos:**

1. **No Hostinger hPanel:**
   - Vá em **Domains** → **Subdomains**
   - Crie um subdomínio: `novo.senior-floors.com` ou `app.senior-floors.com`

2. **Associar ao Node.js App:**
   - Abra o **Node.js Web App**
   - Vá em **Domain** ou **Connect Domain**
   - Adicione: `novo.senior-floors.com`
   - Salve

3. **Atualizar Variáveis de Ambiente:**
   ```
   NEXTAUTH_URL=https://novo.senior-floors.com
   NEXT_PUBLIC_SITE_URL=https://novo.senior-floors.com
   ```

4. **Fazer Redeploy:**
   - Faça um novo deploy do app
   - Aguarde alguns minutos

5. **Testar:**
   - Acesse: `https://novo.senior-floors.com`
   - Deve mostrar o novo site Node.js ✅

**Resultado:** 
- Site antigo (PHP): `www.senior-floors.com`
- Site novo (Node.js): `novo.senior-floors.com`

---

## 🎯 Solução 2: Redirecionar Domínio Principal

### Configurar Redirecionamento do PHP para Node.js

**Passos:**

1. **No site PHP antigo (public_html):**
   - Crie ou edite o arquivo `.htaccess`
   - Adicione redirecionamento:

   ```apache
   # Redirecionar tudo para o novo site Node.js
   RewriteEngine On
   RewriteCond %{HTTP_HOST} ^(www\.)?senior-floors\.com$ [NC]
   RewriteRule ^(.*)$ https://novo.senior-floors.com/$1 [R=301,L]
   ```

2. **OU** criar `index.php` que redireciona:

   ```php
   <?php
   header("Location: https://novo.senior-floors.com", true, 301);
   exit;
   ?>
   ```

**Resultado:** 
- Quando acessar `www.senior-floors.com`, redireciona para `novo.senior-floors.com`

---

## 🎯 Solução 3: Usar Path/Subpasta no Node.js

### Configurar Node.js para rodar em `/newsite`

**Se o Hostinger permitir configurar o path:**

1. **No Node.js App:**
   - Configure para rodar em: `/newsite`
   - Ou use `basePath` no `next.config.js`

2. **Atualizar `next.config.js`:**

   ```javascript
   const nextConfig = {
     basePath: '/newsite',  // Adicione esta linha
     reactStrictMode: true,
     // ... resto da config
   }
   ```

3. **Atualizar Variáveis:**
   ```
   NEXTAUTH_URL=https://www.senior-floors.com/newsite
   NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite
   ```

4. **Fazer Redeploy**

**Resultado:**
- Site antigo (PHP): `www.senior-floors.com`
- Site novo (Node.js): `www.senior-floors.com/newsite`

---

## 🎯 Solução 4: Contatar Suporte Hostinger

### Pedir para Associar Domínio ao Node.js App

**O que fazer:**

1. **Contatar Suporte Hostinger:**
   - Chat online no hPanel
   - Ou ticket de suporte

2. **Explicar:**
   ```
   Olá, preciso de ajuda para associar o domínio www.senior-floors.com 
   ao meu Node.js Web App ao invés do site PHP atual.
   
   Já criei o Node.js Web App e está funcionando, mas o domínio 
   principal ainda aponta para o site antigo (public_html).
   
   Pode me ajudar a:
   1. Remover www.senior-floors.com do site antigo
   2. Associar www.senior-floors.com ao Node.js Web App
   ```

3. **Informações para fornecer:**
   - Domínio: `www.senior-floors.com`
   - Node.js App: (nome do seu app)
   - Repositório: `https://github.com/nakazone/senior-floors.git`

**Resultado:** Suporte faz a mudança para você ✅

---

## 🎯 Solução 5: Migrar Site Antigo para Subdomínio

### Mover PHP para Subdomínio, Node.js para Principal

**Passos:**

1. **Criar subdomínio para PHP:**
   - `old.senior-floors.com` ou `legacy.senior-floors.com`
   - Associe ao site antigo (public_html)

2. **Associar domínio principal ao Node.js:**
   - Remova `www.senior-floors.com` do site antigo
   - Adicione `www.senior-floors.com` ao Node.js app

3. **Atualizar Variáveis Node.js:**
   ```
   NEXTAUTH_URL=https://www.senior-floors.com
   NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com
   ```

4. **Fazer Redeploy**

**Resultado:**
- Site antigo (PHP): `old.senior-floors.com`
- Site novo (Node.js): `www.senior-floors.com` ✅

---

## 📊 Comparação das Soluções

| Solução | Dificuldade | Tempo | Resultado |
|---------|-------------|-------|-----------|
| **1. Subdomínio** | ⭐ Fácil | 10 min | `novo.senior-floors.com` |
| **2. Redirecionamento** | ⭐⭐ Médio | 15 min | Redireciona para subdomínio |
| **3. Path/Subpasta** | ⭐⭐ Médio | 20 min | `www.senior-floors.com/newsite` |
| **4. Suporte Hostinger** | ⭐ Fácil | 1-24h | `www.senior-floors.com` (ideal) |
| **5. Migrar PHP** | ⭐⭐⭐ Difícil | 30 min | `www.senior-floors.com` (ideal) |

---

## ✅ Recomendação

**Para funcionar AGORA (rápido):**
→ **Solução 1: Usar Subdomínio**
- Crie `novo.senior-floors.com`
- Associe ao Node.js app
- Funciona em minutos!

**Para solução definitiva (ideal):**
→ **Solução 4: Contatar Suporte**
- Eles fazem a mudança
- Você fica com `www.senior-floors.com` no Node.js
- Site antigo pode ir para subdomínio

---

## 🚀 Implementação Rápida: Subdomínio

**Passo a passo rápido:**

1. **Criar subdomínio:**
   ```
   hPanel → Domains → Subdomains → Create
   Nome: novo
   Domínio: senior-floors.com
   → Criar
   ```

2. **Associar ao Node.js:**
   ```
   Node.js App → Domain → Add Domain
   → novo.senior-floors.com
   → Save
   ```

3. **Atualizar env vars:**
   ```
   NEXTAUTH_URL=https://novo.senior-floors.com
   NEXT_PUBLIC_SITE_URL=https://novo.senior-floors.com
   ```

4. **Redeploy:**
   ```
   Node.js App → Deploy → Redeploy
   ```

5. **Testar:**
   ```
   https://novo.senior-floors.com
   ```

**Pronto!** Site Node.js funcionando em minutos! ✅

---

## 📝 Notas Importantes

- **DNS pode levar alguns minutos** para propagar
- **Teste em modo anônimo** para evitar cache
- **Limpe cache do navegador** se necessário
- **Subdomínio é temporário** - depois pode migrar para principal

---

**Última atualização:** Soluções alternativas quando domínio principal não funciona
