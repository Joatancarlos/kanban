#!/bin/bash

# Solicita a opção ao usuário
echo "Escolha uma opção:
1. Criar uma nova Branch e dar push Origin com nome personalizado
2. Add, Commit e Push
"
read opcao

# Cria uma nova branch e envia para o repositório remoto se a opção for 1
if [ "$opcao" -eq 1 ]; then
  echo "Digite o nome da branch: "
  read branch
  git branch $branch
  git push -u origin $branch
fi

# Adiciona, faz commit e envia para o repositório remoto se a opção for 2
if [ "$opcao" -eq 2 ]; then
  git add .
  # Solicita a mensagem do commit ao usuário
  echo "Digite a mensagem do commit: "
  read mensagem
  git commit -m "$mensagem"
  git push
fi
