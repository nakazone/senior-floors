# Configurar build no Netlify (corrigir erro do plugin Next.js)

Se o build falhar com **"Your publish directory does not contain expected Next.js build output"** ou **"echo 'Static site - no build step'"**, o site foi criado como **site estático**. Ajuste assim:

## No painel Netlify

1. Abra o **site** (ex.: newSFSystemJS).
2. Vá em **Site configuration** (ou **Site settings**) ? **Build & deploy** ? **Build settings**.
3. Clique em **Edit settings** (ou **Override**).

Configure **exatamente**:

| Campo | Valor |
|-------|--------|
| **Base directory** | `apps/system` |
| **Build command** | `npm run build` |
| **Publish directory** | *(deixe em branco)* |
| **Functions directory** | *(em branco)* |

4. Salve (**Save**).

Não use presets como "Static site" ou "No build step". O build precisa rodar `npm run build` dentro de `apps/system` para gerar o `.next` do Next.js.

5. **Trigger deploy** ? **Deploy site** (ou **Clear cache and deploy site**).

---

## Resumo

- **Base directory:** `apps/system` (pasta do app Next.js no monorepo).
- **Build command:** `npm run build`.
- **Publish directory:** vazio (o plugin `@netlify/plugin-nextjs` usa o `.next` gerado pelo build).

Depois do próximo deploy, o plugin deve encontrar o output do Next.js.
