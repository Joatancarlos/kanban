#!/bin/bash

# Solicita a opção ao usuário
echo "Escolha uma opção:
1. Criar uma nova Branch e dar push Origin com nome personalizado
2. Add, Commit e Push
3. Fechar o git-auto
"
read opcao

# Verifica se a opção é válida
while [ "$opcao" -ne 1 -a "$opcao" -ne 2 -a "$opcao" -ne 3 ]; do
  echo "Opção inválida. Por favor, escolha uma opção entre 1, 2 e 3."
  echo "
1. Criar uma nova Branch e dar push Origin com nome personalizado
2. Add, Commit e Push
3. Fechar o git-auto
"
  read opcao
done

# Cria uma nova branch e envia para o repositório remoto se a opção for 1
if [ "$opcao" -eq 1 ]; then
  echo "Digite o nome da branch: "
  read branch
  git checkout -b $branch
  git add .
  # Solicita a mensagem do commit ao usuário
  echo "Digite a mensagem do commit: "
  read mensagem
  git commit -m "$mensagem"
  git push -u origin $branch
  break
fi

# Adiciona, faz commit e envia para o repositório remoto se a opção for 2
if [ "$opcao" -eq 2 ]; then
  git add .
  # Solicita a mensagem do commit ao usuário
  echo "Digite a mensagem do commit: "
  read mensagem
  git commit -m "$mensagem"
  git push
  break
fi

# Fecha o executável se a opção for 3
if [ "$opcao" -eq 3 ]; then
  exit
fi
