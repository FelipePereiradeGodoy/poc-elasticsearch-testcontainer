import {
  ElasticsearchContainer,
  StartedElasticsearchContainer,
} from '@testcontainers/elasticsearch';

let elasticContainer: StartedElasticsearchContainer;

const setupElasticsearch = async () => {
  elasticContainer = await new ElasticsearchContainer(
    'docker.elastic.co/elasticsearch/elasticsearch:7.17.9',
  )
    .withExposedPorts({
      container: 9200,
      host: 9200,
    })
    .withReuse()
    .start();

  (global as any).__ELASTIC_CONTAINER__ = elasticContainer;
};

export default async () => {
  console.log('Iniciando container Elastic');
  await setupElasticsearch();
};
