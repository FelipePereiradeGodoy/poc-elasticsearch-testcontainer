import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SearchModule } from './../../src/search.module';

describe('SearchController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be create a pipeline', async () => {
    const response = await request(app.getHttpServer())
      .post('/search/create-pipeline')
      .send();

    expect(response.status).toBe(201);
  });
});
