# Deploy no Hostinger (Git + Node.js)

Este repositorio e um **monorepo** (Landing, Sistema, Site). O Hostinger espera um unico app Node/Next na raiz, por isso e preciso configurar **comandos de build e start** manualmente.

## Opcao 1: Deploy do Site Principal (www.senior-floors.com)

No painel do Hostinger (Node.js Web App / Git):

1. **Repositorio:** `https://github.com/nakazone/senior-floors.git` (branch `main`).

2. **Build command** (obrigatorio):
   ```bash
   npm install && npm run build -w website
   ```

3. **Start command:**
   ```bash
   npm run start -w website
   ```

4. **Application root / Install path:** deixe vazio (ou o padrao). O Hostinger clona o repo inteiro; os comandos acima rodam o app em `apps/website`.

5. **Node.js version:** 18.x ou 20.x.

6. **Variaveis de ambiente:** configure no painel (ex.: `DATABASE_URL`, `NEXTAUTH_SECRET`) conforme o `.env.example` em `apps/website`.

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

Resumo: **Build** = `npm install && npm run build -w website` e **Start** = `npm run start -w website` para o site principal.
