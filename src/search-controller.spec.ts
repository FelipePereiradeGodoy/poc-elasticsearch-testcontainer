import { ReadableStream } from 'web-streams-polyfill/ponyfill/es2018';
(global as any).ReadableStream = ReadableStream;

import {
  ElasticsearchContainer,
  StartedElasticsearchContainer,
} from '@testcontainers/elasticsearch';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SearchModule } from './search.module';

describe('SearchController', () => {
  let app: INestApplication;
  let elasticContainer: StartedElasticsearchContainer;

  beforeAll(async () => {
    elasticContainer = await new ElasticsearchContainer(
      'docker.elastic.co/elasticsearch/elasticsearch:7.17.9',
    )
      .withExposedPorts({
        container: 9200,
        host: 9200,
      })
      .start();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 20000);

  afterAll(async () => {
    await app.close();
    await elasticContainer.stop();
  }, 10000);

  it('Should be create a pipeline', async () => {
    const response = await request(app.getHttpServer())
      .post('/search/create-pipeline')
      .send();

    expect(response.status).toBe(201);
  });
});
