import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export default class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('create-pipeline')
  async createPipeline() {
    await this.searchService.createPipeline();

    return;
  }

  @Post('create-index')
  async createIndex(@Body() payload: any) {
    const indexName = payload.indexName;

    await this.searchService.createIndex(indexName);

    return;
  }

  @Post('create-document')
  async createDocument(@Body() payload: any) {
    const indexName = payload.indexName;
    const documentId = payload.documentId;
    const document = payload.document;
    const pipelineName = payload.pipelineName;

    await this.searchService.createDocument(
      indexName,
      documentId,
      document,
      pipelineName,
    );

    return;
  }

  @Post('get-document-by-id')
  async getDocumentById(@Body() payload: any) {
    const indexName = payload.indexName;
    const documentId = payload.documentId;

    const response = await this.searchService.getDocumentById(indexName, documentId);

    return response;
  }

  @Post('search-item-by-date-range')
  async searchItemByDateRange(@Body() payload: any) {
    const indexName = payload.indexName;
    const initialDate = payload.initialDate;
    const finalDate = payload.finalDate;

    const response = await this.searchService.searchItemsByDateRange(
      indexName,
      initialDate,
      finalDate,
    );

    return response;
  }

  @Post('search-item-by-item-id')
  async searchItemsByItemId(@Body() payload: any) {
    const indexName = payload.indexName;
    const itemId = payload.itemId;

    const response = await this.searchService.searchItemsByItemId(indexName, itemId);

    return response;
  }

  @Post('search-item-by-item-description')
  async searchItemsByDescription(@Body() payload: any) {
    const indexName = payload.indexName;
    const itemDescription = payload.itemDescription;

    const response = await this.searchService.searchItemsByDescription(
      indexName,
      itemDescription,
    );

    return response;
  }
}
