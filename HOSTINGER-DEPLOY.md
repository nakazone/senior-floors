# Deploy no Hostinger (Git + Node.js)

Este repositorio e um **monorepo** (Landing, Sistema, Site). O Hostinger espera um unico app Node/Next na raiz, por isso use os comandos abaixo para o **site principal** (apps/website).

## Deploy do Site Principal (www.senior-floors.com)

**Para o novo site Node aparecer em www.senior-floors.com (e nao o site antigo):** no Hostinger, o **dominio** (www.senior-floors.com) tem de estar associado a esta **Node.js Web App**, nao ao site antigo (public_html / PHP). No painel, em Domains ou na Node.js app, defina www.senior-floors.com como dominio desta aplicacao. Se o dominio ainda apontar para public_html, continuara a ver o site antigo.

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
   - `NEXTAUTH_URL` = `https://www.senior-floors.com`
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

- **www.senior-floors.com mostra o site antigo**  
  Siga a secao abaixo: **Fazer o dominio mostrar o novo site (Node)**.
---

## Fazer o dominio mostrar o novo site (Node)

Se **www.senior-floors.com** ainda abre o site antigo (PHP/estatico), e porque o dominio esta ligado ao alojamento antigo (public_html), nao a app Node. E preciso **associar o dominio a esta Node.js Web App** no hPanel.

### Passos no hPanel (Hostinger)

1. Entre no **hPanel** (painel da Hostinger).
2. Va em **Websites** (ou **Sites**) e localize **duas** coisas:
   - o **site antigo** (ex.: senior-floors.com / public_html);
   - a **Node.js Web App** onde fez deploy do repo (Git) com Build `npm run build` e Start `npm run start:hostinger`.
3. Abra a **Node.js Web App** (clique nela) e procure:
   - **Domain** / **Dominio** / **Application URL** / **Connect custom domain**.
4. **Conecte o dominio** www.senior-floors.com a **esta** Node.js app:
   - Se houver "Add domain" ou "Connect custom domain", adicione **www.senior-floors.com** (e, se quiser, **senior-floors.com** para redirecionar para www).
   - Se o dominio ja estiver atribuido a outro site (o site antigo), pode ser preciso **alterar o dominio do site antigo** (Sites → tres pontos no site antigo → Alterar dominio) para outro endereco ou subdominio, e depois **atribuir www.senior-floors.com** a esta Node.js app.
5. Guarde as alteracoes e aguarde alguns minutos (ou ate 24 h se a Hostinger indicar propagacao DNS).
6. Confirme que as variaveis desta app estao corretas: `NEXTAUTH_URL` e `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com`.

**Referencia Hostinger:** [Connect a custom domain to your web app](https://www.hostinger.com/in/tutorials/connect-custom-domain-to-web-app)

Se no seu plano a opcao de "conectar dominio" so aparecer para o site em public_html e nao para a Node.js app, pode ser limitacao do painel. Nesse caso, as alternativas sao: (1) usar um **subdominio** para o novo site (ex.: **novo.senior-floors.com** ou **app.senior-floors.com**) e apontar esse subdominio para a Node.js app; ou (2) contactar o **suporte Hostinger** e pedir para associar **www.senior-floors.com** a esta Node.js Web App em vez do site em public_html.
