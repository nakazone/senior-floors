# 📋 Como Importar Variáveis de Ambiente no Hostinger

Este guia mostra como configurar as variáveis de ambiente no painel do Hostinger.

## 📁 Arquivo de Referência

Use o arquivo **`.env.hostinger`** como referência. Ele contém todas as variáveis necessárias com instruções.

## 🚀 Passo a Passo

### 1. Acessar o Painel do Hostinger

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login

### 2. Localizar a Node.js Web App

1. Vá em **Websites** (ou **Sites**)
2. Clique na **Node.js Web App** onde você fez deploy

### 3. Abrir Environment Variables

1. Na página da Node.js Web App, procure por:
   - **Environment Variables**
   - **Variáveis de Ambiente**
   - **Env Variables**
   - **Settings** → **Environment Variables**

### 4. Adicionar Variáveis

**Opção A: Adicionar uma por uma (recomendado)**

Para cada variável do arquivo `.env.hostinger`:

1. Clique em **Add Variable** ou **Adicionar Variável**
2. **Name (Nome):** Cole o nome da variável (ex: `DATABASE_URL`)
3. **Value (Valor):** Cole o valor (ex: `mysql://usuario:senha@localhost:3306/banco`)
4. Clique em **Save** ou **Salvar**

**Opção B: Importar arquivo (se disponível)**

Alguns painéis permitem importar um arquivo `.env`:

1. Procure por **Import** ou **Upload .env file**
2. Selecione o arquivo `.env.hostinger`
3. Revise os valores antes de salvar

### 5. Variáveis Obrigatórias

Certifique-se de adicionar estas variáveis **obrigatórias**:

```
DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
NEXTAUTH_SECRET=sua-chave-aleatoria-aqui
NEXTAUTH_URL=https://www.senior-floors.com
NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com
```

### 6. Como Obter DATABASE_URL

1. No Hostinger, vá em **Databases** → **MySQL Databases**
2. Anote:
   - **Database name** (nome do banco)
   - **Username** (usuário)
   - **Password** (senha)
   - **Host** (geralmente `localhost`)
3. Monte a URL no formato:
   ```
   mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO
   ```
4. **Importante:** Se a senha tiver caracteres especiais, codifique-os:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - etc.

**Exemplo:**
```
mysql://u123456789:MinhaSenh@123@localhost:3306/u123456789_seniorfloors
```

### 7. Como Gerar NEXTAUTH_SECRET

No terminal (Mac/Linux):

```bash
openssl rand -base64 32
```

Copie o resultado e use como valor de `NEXTAUTH_SECRET`.

**OU** use este gerador online: https://generate-secret.vercel.app/32

### 8. Verificar e Salvar

1. Revise todas as variáveis adicionadas
2. Certifique-se de que não há espaços extras
3. Clique em **Save** ou **Deploy** (se o painel pedir)

### 9. Fazer Redeploy

Após adicionar as variáveis:

1. Na Node.js Web App, procure por **Redeploy** ou **Deploy**
2. Clique para fazer um novo deploy
3. Aguarde o build terminar

### 10. Testar

1. Acesse: `https://www.senior-floors.com`
2. Teste o admin: `https://www.senior-floors.com/admin`
3. Se houver erros, verifique os logs no painel

---

## ✅ Checklist

- [ ] Acessei o hPanel da Hostinger
- [ ] Localizei a Node.js Web App
- [ ] Abri Environment Variables
- [ ] Adicionei `DATABASE_URL` (com valores reais do MySQL)
- [ ] Adicionei `NEXTAUTH_SECRET` (chave aleatória gerada)
- [ ] Adicionei `NEXTAUTH_URL` = `https://www.senior-floors.com`
- [ ] Adicionei `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com`
- [ ] Revisei todas as variáveis
- [ ] Fiz redeploy da aplicação
- [ ] Testei o site funcionando

---

## ❓ Problemas Comuns

### "Erro ao conectar ao banco de dados"

**Solução:**
- Verifique se `DATABASE_URL` está correto
- Use `localhost` como HOST (não `host` ou outro valor)
- Certifique-se de que a senha está codificada se tiver caracteres especiais
- Verifique se o banco MySQL existe e está ativo

### "NEXTAUTH_SECRET não definido"

**Solução:**
- Certifique-se de que adicionou a variável `NEXTAUTH_SECRET`
- O valor deve ser uma string longa (32+ caracteres)
- Faça redeploy após adicionar

### "Site não carrega após adicionar variáveis"

**Solução:**
- Verifique se não há espaços extras nos valores
- Certifique-se de que fez redeploy após adicionar as variáveis
- Verifique os logs de build no painel

---

## 📝 Exemplo Completo

Aqui está um exemplo de como as variáveis devem ficar no painel:

```
DATABASE_URL = mysql://u123456789:MinhaSenh@123@localhost:3306/u123456789_seniorfloors
NEXTAUTH_SECRET = aB3xY9mK2pL8qR5tW1vZ4nJ7hG0fD6cS3bN9mK2pL8qR5tW1vZ4nJ7hG0fD6cS3b
NEXTAUTH_URL = https://www.senior-floors.com
NEXT_PUBLIC_SITE_URL = https://www.senior-floors.com
```

**Lembre-se:** Substitua pelos seus valores reais!

---

**Última atualização:** Baseado na documentação do projeto e painel Hostinger
