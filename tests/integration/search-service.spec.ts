import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './../../src/search.service';

describe('SearchService', () => {
  let searchService: SearchService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ElasticsearchModule.register({
          node: 'http://localhost:9200',
        }),
      ],
      providers: [SearchService],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
  });

  it('should create a document', async () => {
    const indexName = 'test-index';
    const documentId = 'test-index-1';
    const document = 'foo bar';

    await expect(
      searchService.createDocument(indexName, documentId, document),
    ).resolves.not.toThrow();
  });
});
