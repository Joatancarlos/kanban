#!/bin/bash

# Adiciona todos os arquivos à área de preparação
git add .

# Solicita a mensagem do commit ao usuário
echo "Digite a mensagem do commit: "
read mensagem

# Faz um commit com a mensagem fornecida pelo usuário
git commit -m "$mensagem"

# Envia as alterações para o repositório remoto
git push
