# Fazer o deploy do Sistema no Netlify

Siga um dos fluxos abaixo no terminal (na pasta do projeto).

---

## Opção 1: Criar um site novo no Netlify (recomendado)

Na pasta **senior-floors** rode:

```bash
npm run deploy:system
```

ou:

```bash
netlify deploy --prod --filter system
```

1. Quando aparecer **"What would you like to do?"**, use a seta **para baixo** e escolha **"+ Create & configure a new project"** e dê Enter.
2. Depois escolha o **Team** (ex.: Agência All In) e Enter.
3. Digite um **nome para o site** (ex.: `newSFSystemJS`) e Enter.
4. O Netlify vai fazer o **build** (apps/system) e o **deploy**. No final ele mostra a URL do site (ex.: `https://newSFSystemJS.netlify.app/system`).

Na primeira vez o link fica salvo; nas próximas vezes basta rodar de novo:

```bash
npm run deploy:system
```

---

## Opção 2: Você já criou o site no painel Netlify

Se você já criou um site (ex.: newSFSystemJS) em [app.netlify.com](https://app.netlify.com):

```bash
cd /Users/naka/senior-floors
netlify link --name newSFSystemJS --filter system
npm run deploy:system
```

---

## Variáveis de ambiente (banco, senha)

Depois do primeiro deploy, no **Netlify** vá em:

**Site configuration > Environment variables**

e adicione:

- `DATABASE_URL` – connection string do MySQL (ex.: Hostinger)
- `ADMIN_PASSWORD` – senha do admin
- `SESSION_SECRET` – string aleatória longa

Depois faça **Trigger deploy** (redeploy) para as variáveis valerem.

---

## Resumo

| Comando | O que faz |
|--------|------------|
| `npm run deploy:system` | Build do app system + deploy no Netlify (pede criar/linkar site na 1ª vez) |

URL final do sistema: **https://SEU-SITE.netlify.app/system** (login em **/system/login**).
