# Deploy no Hostinger (Git + Node.js)

Este repositorio e um **monorepo** (Landing, Sistema, Site). O Hostinger espera um unico app Node/Next na raiz, por isso use os comandos abaixo para o **site principal** (apps/website).

## Deploy do Site Principal (www.senior-floors.com)

No painel do Hostinger (Node.js Web App / Git):

1. **Repositorio:** `https://github.com/nakazone/senior-floors.git` (branch `main`).

2. **Build command** (obrigatorio):
   ```bash
   npm install && npm run build
   ```
   O script `build` na raiz já faz o deploy do site (website) e deixa o output em `.next` na raiz. Se preferir ser explicito: `npm run build:hostinger`.

3. **Start command:**
   ```bash
   npm run start:hostinger
   ```

4. **Output directory:** deixe em branco ou use `.next` (o build:hostinger ja coloca o output na raiz).

5. **Node.js version:** 18.x ou 20.x.

6. **Variaveis de ambiente:** obrigatorias para o site + admin:
   - `DATABASE_URL` = URL MySQL (ex.: `mysql://user:pass@host:3306/dbname`)
   - `NEXTAUTH_SECRET` = chave aleatoria (ex.: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` = `https://www.senior-floors.com/newsite`
   - `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com`

7. **Banco MySQL:** O app website usa **MySQL**. No primeiro deploy, crie o banco no Hostinger e rode as migracoes (via SSH ou script):
   ```bash
   cd apps/website && npx prisma db push
   ```
   Ou use `npx prisma migrate deploy` se tiver migracoes MySQL.

---

## Opcao 2: Deploy da Landing (lp.senior-floors.com)

Se for criar um **segundo** Node.js app no Hostinger para a landing:

- **Build command:** `npm install && npm run build -w landing`
- **Start command:** `npm run start -w landing`

---

## Se o painel tiver "Raiz do projeto" / "Root directory"

Se o Hostinger permitir definir a **pasta do aplicativo** (ex.: "Root directory", "Application path"):

- Defina como **`apps/website`** para o site principal.
- Assim os comandos podem ser apenas: **Build** `npm run build`, **Start** `npm run start` (o Hostinger roda tudo dentro de `apps/website`).

---

## Se der "Unsupported framework or invalid project structure"

O Hostinger detecta o framework pela raiz do repo. Fizemos o seguinte:

- Existe um `next.config.js` na **raiz** so para a deteccao aceitar o projeto.
- Voce **precisa** informar os comandos acima (Build e Start). Nao use os sugeridos automaticamente (ex.: so `npm run build`), pois o padrao do repo builda os 3 apps.

Resumo: **Build** = `npm install && npm run build` e **Start** = `npm run start:hostinger`.

---

## Erros comuns

- **"No output directory found after build"**  
  O **Build** deve ser `npm install && npm run build` (o script `build` na raiz já gera o `.next` na raiz para o website). Nao use um comando que builda outros apps (landing/system). Para buildar os 3 apps use `npm run build:all`.

- **"Can't reach database server at \`host:3306\`"**  
  A `DATABASE_URL` deve ser a URL real do MySQL do Hostinger (ex.: `mysql://usuario:senha@localhost:3306/nome_do_banco`). Nao use o host literal `host` — use o host que o painel do Hostinger mostra para o banco (geralmente `localhost`). O build do website nao precisa do banco (paginas admin e de dados sao `force-dynamic`); o erro so aparece se alguma pagina tentar conectar no build.
