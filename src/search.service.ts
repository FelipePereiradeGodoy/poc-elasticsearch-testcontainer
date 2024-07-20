import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createPipeline() {
    await this.elasticsearchService.ingest.putPipeline({
      id: 'pipeline-items-log',
      body: {
        description:
          'Pipeline para transformar informações log de itens em objeto',
        processors: [
          {
            grok: {
              field: 'message',
              patterns: [
                '%{TIMESTAMP_ISO8601:date} - %{INT:id_item} - %{GREEDYDATA:description}',
              ],
            },
          },
          {
            date: {
              field: 'date',
              formats: ['yyyy-MM-dd HH:mm:ss'],
              target_field: 'date',
            },
          },
          {
            set: {
              field: 'id_item',
              value: '{{id_item}}',
            },
          },
          {
            set: {
              field: 'description',
              value: '{{description}}',
            },
          },
        ],
      },
    });

    console.log('Pipeline criado com sucesso');

    return;
  }

  async createIndex(indexName: string): Promise<void> {
    const existsIndex = await this.elasticsearchService.indices.exists({
      index: indexName,
    });

    if (existsIndex) {
      console.log('Index já existente!');
      return;
    }

    await this.elasticsearchService.indices.create({ index: indexName });

    console.log(`Index ${indexName} criado com sucesso!`);
    return;
  }

  async createDocument(
    indexName: string,
    documentId: string,
    document: any,
    pipelineName: string,
  ): Promise<void> {
    await this.elasticsearchService.index({
      index: indexName,
      id: documentId,
      body: {
        message: document,
      },
      pipeline: pipelineName,
    });

    console.log(`Documento criado com sucesso!`);
    return;
  }

  async getDocumentById(indexName: string, documentId: string) {
    const document = await this.elasticsearchService.get({
      index: indexName,
      id: documentId,
    });

    console.log('Document By Id: ');
    console.log(document);

    return;
  }

  async searchItemsByDateRange(
    indexName: string,
    initialDate: string,
    finalDate: string,
  ) {
    const documentInfo = await this.elasticsearchService.search({
      index: indexName,
      query: {
        range: {
          date: {
            gte: initialDate,
            lte: finalDate,
          },
        },
      },
    });

    console.log('Items By Date Range: ');
    console.log(documentInfo.hits.hits);

    return;
  }

  async searchItemsByItemId(indexName: string, itemId: number) {
    const documentInfo = await this.elasticsearchService.search({
      index: indexName,
      query: {
        match: {
          id_item: itemId,
        },
      },
    });

    console.log('Items By Id: ');
    console.log(documentInfo.hits.hits);

    return;
  }

  async searchItemsByDescription(indexName: string, itemDescription: string) {
    const documentInfo = await this.elasticsearchService.search({
      index: indexName,
      query: {
        match_phrase: {
          description: itemDescription,
        },
      },
    });

    console.log('Items By Description: ');
    console.log(documentInfo.hits.hits);

    return;
  }
}
