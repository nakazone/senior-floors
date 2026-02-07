#!/bin/bash
# Deploy do app System (CRM) no Netlify
# Uso: ./scripts/deploy-system-netlify.sh
# Ou: npm run deploy:system (se adicionado ao package.json)

set -e
cd "$(dirname "$0")/.."

echo ">>> Deploy Sistema (apps/system) para Netlify"
echo ""

# 1. Verificar se está linkado
if ! netlify status --filter system 2>/dev/null | grep -q "Site name"; then
  echo "Este projeto ainda nao esta linkado a um site Netlify."
  echo ""
  echo "Escolha uma opcao:"
  echo "  A) Criar um NOVO site no Netlify (recomendado para newSFSystemJS)"
  echo "     Rode: netlify deploy --prod --filter system"
  echo "     Quando perguntar, escolha: 'Create & configure a new project'"
  echo ""
  echo "  B) Se voce JA criou o site 'newSFSystemJS' no painel Netlify:"
  echo "     Rode: netlify link --name newSFSystemJS --filter system"
  echo "     Depois: netlify deploy --prod --filter system"
  echo ""
  exit 1
fi

# 2. Build e deploy
echo ">>> Executando build e deploy..."
netlify deploy --prod --filter system

echo ""
echo ">>> Deploy concluido. URL em production sera exibida acima."
