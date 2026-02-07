# 🖥️ Como Rodar o Projeto Localmente (localhost)

Guia completo para rodar o site, landing e sistema no seu computador.

## 📋 Pré-requisitos

- **Node.js 18+** instalado
- **npm** ou **yarn** instalado
- **Git** (para clonar o repositório)

## 🚀 Instalação Inicial

### 1. Clonar o Repositório (se ainda não tiver)

```bash
git clone https://github.com/nakazone/senior-floors.git
cd senior-floors
```

### 2. Instalar Dependências

```bash
npm install
```

Isso vai instalar todas as dependências dos 3 apps (website, landing, system).

### 3. Configurar Variáveis de Ambiente

**Para o Website (apps/website):**

Crie o arquivo `apps/website/.env.local`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# NextAuth (gerar com: openssl rand -base64 32)
NEXTAUTH_SECRET=sua-chave-aleatoria-aqui
NEXTAUTH_URL=http://localhost:3000

# Banco de Dados (opcional para desenvolvimento)
# DATABASE_URL="file:./prisma/dev.db"
# OU use MySQL local:
# DATABASE_URL="mysql://usuario:senha@localhost:3306/seniorfloors"
```

**Gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🌐 Rodar o Website (Site Principal)

### Opção 1: Rodar apenas o Website

```bash
npm run dev:website
```

**Acesse:** http://localhost:3000

### Opção 2: Rodar tudo (Website + Landing + System)

```bash
npm run dev
```

Isso vai rodar:
- Website: http://localhost:3000
- Landing: http://localhost:8000
- System: http://localhost:8001

---

## 📄 Rodar a Landing Page

```bash
npm run dev:landing
```

**Acesse:** http://localhost:8000

---

## ⚙️ Rodar o Sistema (CRM)

```bash
npm run dev:system
```

**Acesse:** http://localhost:8001/system

---

## 🔧 Configuração Detalhada

### Website (apps/website)

**Arquivo:** `apps/website/.env.local`

```bash
# URL do site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# NextAuth
NEXTAUTH_SECRET=sua-chave-aleatoria
NEXTAUTH_URL=http://localhost:3000

# Banco de Dados (SQLite para desenvolvimento)
DATABASE_URL="file:./prisma/dev.db"

# OU MySQL local
# DATABASE_URL="mysql://root:senha@localhost:3306/seniorfloors"
```

**Rodar:**
```bash
cd apps/website
npm run dev
```

**Acessar:**
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

### Landing (apps/landing)

**Arquivo:** `apps/landing/.env.local` (opcional)

```bash
# Se usar banco de dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/seniorfloors"
```

**Rodar:**
```bash
cd apps/landing
npm run dev
```

**Acessar:** http://localhost:8000

### System (apps/system)

**Arquivo:** `apps/system/.env.local`

```bash
# Banco de Dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/seniorfloors"

# Admin Password
ADMIN_PASSWORD="sua-senha-admin"

# Session Secret
SESSION_SECRET="sua-chave-aleatoria"
```

**Rodar:**
```bash
cd apps/system
npm run dev
```

**Acessar:** http://localhost:8001/system

---

## 🗄️ Configurar Banco de Dados Local

### Opção 1: SQLite (Mais Fácil - Website)

O website pode usar SQLite localmente:

```bash
cd apps/website
npx prisma db push
npx prisma db seed  # Se tiver seed
```

### Opção 2: MySQL Local

1. **Instalar MySQL:**
   - Mac: `brew install mysql`
   - Windows: Baixar do site oficial
   - Linux: `sudo apt install mysql-server`

2. **Criar Banco:**
   ```sql
   CREATE DATABASE seniorfloors;
   ```

3. **Configurar .env:**
   ```
   DATABASE_URL="mysql://root:senha@localhost:3306/seniorfloors"
   ```

4. **Rodar Migrations:**
   ```bash
   cd apps/website
   npx prisma db push
   ```

---

## 🐛 Problemas Comuns

### "Port 3000 already in use"

**Solução:**
```bash
# Matar processo na porta 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot find module"

**Solução:**
```bash
# Reinstalar dependências
rm -rf node_modules
npm install
```

### "Prisma Client not generated"

**Solução:**
```bash
cd apps/website
npx prisma generate
```

### "Database connection error"

**Solução:**
- Verifique se o MySQL está rodando
- Confirme a `DATABASE_URL` no `.env.local`
- Teste a conexão:
  ```bash
  mysql -u usuario -p -h localhost seniorfloors
  ```

---

## 📝 Comandos Úteis

### Desenvolvimento

```bash
# Website apenas
npm run dev:website

# Landing apenas
npm run dev:landing

# System apenas
npm run dev:system

# Tudo junto
npm run dev
```

### Build (Produção Local)

```bash
# Build do website
npm run build:website

# Build de tudo
npm run build

# Rodar build de produção
npm run start:website
```

### Banco de Dados

```bash
# Gerar Prisma Client
cd apps/website
npx prisma generate

# Criar/atualizar banco
npx prisma db push

# Ver banco no Prisma Studio
npx prisma studio
```

---

## ✅ Checklist para Rodar Localmente

- [ ] Node.js 18+ instalado (`node -v`)
- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env.local` criado em `apps/website/`
- [ ] `NEXTAUTH_SECRET` gerado e configurado
- [ ] Banco de dados configurado (SQLite ou MySQL)
- [ ] Prisma Client gerado (`npx prisma generate`)
- [ ] Comando `npm run dev:website` executado
- [ ] Site acessível em http://localhost:3000

---

## 🎯 URLs Locais

| App | URL | Descrição |
|-----|-----|-----------|
| **Website** | http://localhost:3000 | Site principal |
| **Website Admin** | http://localhost:3000/admin | Painel admin |
| **Landing** | http://localhost:8000 | Landing page |
| **System** | http://localhost:8001/system | Sistema CRM |

---

## 🔐 Credenciais Padrão (Desenvolvimento)

**Admin do Website:**
- Email: qualquer email
- Senha: definida em `ADMIN_PASSWORD` no `.env.local`

**System:**
- Email: qualquer email
- Senha: definida em `ADMIN_PASSWORD` no `.env.local`

---

**Última atualização:** Guia completo para rodar localmente
