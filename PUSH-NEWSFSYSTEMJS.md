# Subir o projeto no Git (newSFSystemJS)

O commit e o remote ja estao configurados. Falta criar o repo no GitHub e dar o push.

## 1. Criar o repositorio no GitHub

1. Acesse [github.com/new](https://github.com/new).
2. **Repository name:** `newSFSystemJS`.
3. Deixe **Public** (ou Private, como preferir).
4. **Nao** marque "Add a README" (o projeto ja tem arquivos).
5. Clique em **Create repository**.

## 2. Ajustar o remote (se seu usuario for outro)

Se seu usuario do GitHub **nao** for `naka`, troque a URL do origin:

```bash
cd /Users/naka/senior-floors
git remote set-url origin https://github.com/SEU_USUARIO/newSFSystemJS.git
```

(Substitua `SEU_USUARIO` pelo seu login do GitHub.)

## 3. Enviar para o GitHub

```bash
cd /Users/naka/senior-floors
git push -u origin main
```

Se pedir login, use seu usuario e senha do GitHub (ou um **Personal Access Token** em vez da senha).

---

**Resumo:** Repo criado no GitHub com o nome `newSFSystemJS` ? (opcional) corrigir o remote ? `git push -u origin main`.
