# 📍 Onde Verificar se o Node.js App está Rodando no Hostinger

Guia passo a passo para encontrar o Node.js Web App no painel Hostinger.

## 🚀 Passo a Passo Visual

### 1. Acessar o hPanel

1. Acesse: **https://hpanel.hostinger.com**
2. Faça login com suas credenciais

### 2. Localizar a Seção de Apps

**Opção A: Menu Lateral**

1. No menu lateral esquerdo, procure por:
   - **Websites** ou **Sites**
   - **Web Apps** ou **Applications**
   - **Node.js** ou **Node.js Apps**

2. Clique em uma dessas opções

**Opção B: Dashboard Principal**

1. Na página inicial (Dashboard), procure por:
   - Card ou seção chamada **"Node.js Web App"**
   - Ou **"Web Apps"**
   - Ou **"Applications"**

### 3. Lista de Apps

Você deve ver uma lista com:
- **Sites tradicionais** (PHP, HTML) - geralmente mostram `public_html`
- **Node.js Web Apps** - geralmente mostram o nome do app ou repositório Git

**Procure por:**
- Nome do seu repositório Git (ex: `senior-floors`)
- Ou nome que você deu ao app
- Ou algo como `Node.js App #1`

### 4. Abrir o Node.js App

1. Clique no **Node.js Web App** que você criou
2. Você deve ver uma página com informações do app

### 5. Verificar Status

Na página do Node.js App, procure por:

**Status/Estado:**
- **Online** ✅ (está rodando)
- **Offline** ❌ (não está rodando)
- **Deploying** 🔄 (fazendo deploy)
- **Error** ⚠️ (erro)

**Onde encontrar:**
- No topo da página (badge ou indicador)
- Na seção **"Status"** ou **"State"**
- Ao lado do nome do app

### 6. Verificar Logs

**Para ver se há erros:**

1. Na página do Node.js App, procure por:
   - **Logs** ou **View Logs**
   - **Activity** ou **Deployments**
   - **Console** ou **Terminal**

2. Clique para ver os logs
3. Verifique se há mensagens de erro

### 7. Verificar Deploy

**Para ver o último deploy:**

1. Procure por:
   - **Deployments** ou **Deploys**
   - **Build History**
   - **Activity Log**

2. Veja o último deploy:
   - ✅ **Success** = deploy bem-sucedido
   - ❌ **Failed** = deploy falhou
   - 🔄 **In Progress** = deploy em andamento

---

## 🔍 Se Não Encontrar o Node.js App

### Possibilidade 1: Ainda não foi criado

**Solução:**
1. No hPanel, procure por **"Create App"** ou **"New App"**
2. Selecione **"Node.js"** ou **"Web App"**
3. Configure:
   - Conecte o repositório Git: `https://github.com/nakazone/senior-floors.git`
   - Branch: `main`
   - Build command: `npm install && npm run build`
   - Start command: `npm run start:hostinger`

### Possibilidade 2: Está em outro lugar do painel

**Procure em:**
- **Advanced** → **Node.js**
- **Developer Tools** → **Web Apps**
- **Hosting** → **Node.js Apps**

### Possibilidade 3: Plano não inclui Node.js

**Verifique:**
- Alguns planos Hostinger não incluem Node.js
- Você pode precisar fazer upgrade do plano
- Ou usar VPS/Cloud Hosting

---

## 📸 Onde Procurar (Descrição Visual)

### Menu Lateral (lado esquerdo):
```
📁 Websites
   ├── 📄 Site Principal (public_html) ← Site PHP antigo
   └── ⚙️ Node.js Web App ← Procure aqui!
```

### Dashboard Principal:
```
┌─────────────────────────────────┐
│  Node.js Web App               │
│  Status: Online ✅              │
│  [Ver Detalhes]                 │
└─────────────────────────────────┘
```

### Página do App:
```
┌─────────────────────────────────┐
│  Node.js App: senior-floors     │
│  Status: Online ✅              │
│                                 │
│  [Logs] [Settings] [Deploy]     │
└─────────────────────────────────┘
```

---

## ✅ Checklist Rápido

- [ ] Acessei https://hpanel.hostinger.com
- [ ] Procurei em **Websites** ou **Web Apps** no menu
- [ ] Encontrei o **Node.js Web App** na lista
- [ ] Cliquei no app para abrir
- [ ] Verifiquei o **Status** (Online/Offline)
- [ ] Verifiquei os **Logs** para erros
- [ ] Verifiquei o último **Deploy** (Success/Failed)

---

## 🆘 Se Ainda Não Encontrar

**Opção 1: Contatar Suporte Hostinger**
- Chat online no hPanel
- Explique: "Preciso encontrar meu Node.js Web App"
- Peça ajuda para localizar

**Opção 2: Verificar Email**
- Procure emails da Hostinger sobre criação do app
- Pode ter link direto para o app

**Opção 3: Criar Novo App**
- Se não existir, crie um novo
- Siga o guia `HOSTINGER-DEPLOY.md`

---

## 📞 Informações para o Suporte

Se precisar contatar suporte, tenha estas informações:

- **Domínio:** www.senior-floors.com
- **Repositório Git:** https://github.com/nakazone/senior-floors.git
- **Branch:** main
- **Problema:** Não consigo encontrar meu Node.js Web App no painel

---

**Última atualização:** Guia visual para localizar Node.js App no Hostinger
