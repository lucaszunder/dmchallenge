# Backend Challenge

Este é meu desafio técnico para a vaga de backend na Delivery Much! 🍽

Para subir localmente basta executar os comandos abaixo: 

```shell
docker-compose build
docker-compose up -d rabbitmq stock-service

```

Após inicializar os containers do Rabbit você deve criar uma queue chamada "stock" e executar um bind da exchange "stock" para ela utilizando as routing-keys "decremented" e "incremented"

Depois disso abra novamente o terminal e digite o comando: 

```shell
docker-compose up
```

Pronto, sua API já está no ar 🚀 
