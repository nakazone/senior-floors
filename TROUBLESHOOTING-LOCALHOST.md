# 🔧 Troubleshooting: Localhost Não Funciona

Guia para resolver problemas comuns ao rodar o projeto localmente.

## 🚨 Problemas Comuns e Soluções

### 1. "Internal Server Error" ou Erro 500

**Causa:** Geralmente falta de dependências ou erro no código.

**Solução:**

```bash
# 1. Parar o servidor (Ctrl+C)

# 2. Instalar dependências
cd /Users/naka/senior-floors
npm install

# 3. Instalar dependências do website especificamente
cd apps/website
npm install

# 4. Gerar Prisma Client
npx prisma generate

# 5. Tentar rodar novamente
cd ../..
npm run dev:website
```

---

### 2. "Port 3000 already in use"

**Causa:** Outro processo está usando a porta 3000.

**Solução:**

**Mac/Linux:**
```bash
# Ver o que está usando a porta
lsof -ti:3000

# Matar o processo
lsof -ti:3000 | xargs kill -9

# OU usar outra porta
PORT=3001 npm run dev:website
```

**Windows:**
```bash
# Ver processos na porta
netstat -ano | findstr :3000

# Matar processo (substitua <PID> pelo número)
taskkill /PID <PID> /F
```

---

### 3. "Cannot find module" ou "Module not found"

**Causa:** Dependências não instaladas.

**Solução:**

```bash
# Limpar e reinstalar
cd /Users/naka/senior-floors
rm -rf node_modules
rm -rf apps/*/node_modules
npm install
```

---

### 4. "Prisma Client not generated"

**Causa:** Prisma Client não foi gerado.

**Solução:**

```bash
cd apps/website
npx prisma generate
```

---

### 5. Erro de Banco de Dados

**Causa:** Banco de dados não configurado ou não existe.

**Solução:**

**Para SQLite (mais fácil):**
```bash
cd apps/website
npx prisma db push
```

**Para MySQL:**
- Verifique se MySQL está rodando
- Confirme `DATABASE_URL` no `.env.local`
- Rode: `npx prisma db push`

---

### 6. "EADDRINUSE" (Endereço já em uso)

**Causa:** Porta já está sendo usada.

**Solução:**

```bash
# Matar processo na porta
lsof -ti:3000 | xargs kill -9

# OU mudar porta no .env.local
# Adicione: PORT=3001
```

---

### 7. Página em Branco ou "Cannot GET /"

**Causa:** Servidor não iniciou corretamente.

**Solução:**

```bash
# Verificar logs
npm run dev:website

# Procurar por erros no terminal
# Verificar se apareceu: "Ready on http://localhost:3000"
```

---

## 🔍 Diagnóstico Passo a Passo

### Passo 1: Verificar Node.js

```bash
node -v
# Deve mostrar: v18.x.x ou v20.x.x
```

Se não tiver Node.js, instale: https://nodejs.org

### Passo 2: Verificar Dependências

```bash
cd /Users/naka/senior-floors
ls -la node_modules
# Deve existir a pasta node_modules
```

Se não existir:
```bash
npm install
```

### Passo 3: Verificar Configuração

```bash
cd apps/website
cat .env.local
# Deve ter NEXTAUTH_SECRET e outras variáveis
```

### Passo 4: Tentar Rodar

```bash
cd /Users/naka/senior-floors
npm run dev:website
```

**O que deve aparecer:**
```
✓ Ready in Xs
○ Local: http://localhost:3000
```

**Se aparecer erro:**
- Copie a mensagem de erro completa
- Verifique qual erro específico

---

## 🛠️ Solução Completa (Reset Total)

Se nada funcionar, faça um reset completo:

```bash
# 1. Parar todos os processos
pkill -f "next dev"
pkill -f "node"

# 2. Limpar tudo
cd /Users/naka/senior-floors
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf apps/*/.next

# 3. Reinstalar
npm install

# 4. Gerar Prisma
cd apps/website
npx prisma generate
npx prisma db push

# 5. Rodar
cd ../..
npm run dev:website
```

---

## 📋 Checklist de Verificação

- [ ] Node.js instalado (`node -v`)
- [ ] Dependências instaladas (`npm install`)
- [ ] Prisma Client gerado (`npx prisma generate`)
- [ ] Banco de dados configurado
- [ ] Arquivo `.env.local` existe
- [ ] Porta 3000 livre
- [ ] Servidor inicia sem erros
- [ ] Acessa http://localhost:3000

---

## 🆘 Se Nada Funcionar

1. **Copie a mensagem de erro completa** do terminal
2. **Verifique os logs** quando rodar `npm run dev:website`
3. **Tente rodar direto no app:**
   ```bash
   cd apps/website
   npm run dev
   ```

---

**Última atualização:** Guia de troubleshooting para localhost
