## POC Elasticsearch + NestJS + TestContainers
POC criada com foco em melhorar a busca de dados em log, utilizando a pipeline do elasticsearh para não ser necessário nenhuma refatoração nos logs já existente no sistema que irá enviar os dados para o elastic.
Também foi realizado um estudo sobre a lib TestContainers para subir containers e facilitar os testes de integração e e2e.

## Instalação

```bash
$ npm install
```

## Para rodar o app

```bash
#Inicie o docker com elastic primeiramente.
$ docker compose up

#Inicie o projeto
$ npm run start:dev
```

## EndPoints
Exemplos de requisições nos endpoints.

# Criar Pipeline
POST - /search/create-pipeline
{}
Cria a pipeline line que irá ler as mensagens no formato string("date - id_item - descrição") e converter para propriedades.

# Criar Index
POST - /search/create-index
{
  "indexName": "index_teste"
}
Você pode criar o index na mão ou quando for inserir um registro e o elastic detectar que não existe um index ele cria na hora.
É possivel já deixar seu index pronto para não precisar de pipeline e definir as propriedades da maneira que deseja.

# Criar documento / Inserir registro
POST - /search/create-document
{
  "indexName": "index-updated-items-description",
  "documentId": "updated-items-description_1",
  "document": "2024-07-10 20:01:00 - 112244 - Processador Ryzen 7, 5700X, 3.7ghz",
  "pipelineName": "pipeline-items-log"
}

# Busca um documento pelo id dele.
POST - /search/get-document-by-id
{
  "indexName": "index-updated-items-description",
  "documentId": "updated-items-description_1"
}

# Busca todos os itens por um range de data
POST - /search/search-item-by-date-range
{
  "indexName": "index-updated-items-description",
  "initialDate": "2024-07-10T19:40:00",
  "finalDate": "2024-07-10T20:30:00"
}

# Busca todos os itens que tem o mesmo id
POST - /search/search-item-by-item-id
{
  "indexName": "index-updated-items-description",
  "itemId": 112244
}

# Busca todos os itens que tenham uma parte da descrição em comum.
POST - /search/search-item-by-item-description
{
  "indexName": "index-updated-items-description",
  "itemDescription": "Ryzen 7"
}
Parecido com o operador 'LIKE' do SQL

# OBS
Na parte das buscas acima, caso não informa o nome do index ele trará informação de todas as propriedades que tenham o mesmo nome independete do index, ou seja caso você queira utilizar a mesma pipeline com index diferentes é possivel.