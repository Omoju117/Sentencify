import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Document } from 'schemas';
import { DocumentService } from 'src/document/documentService';

@Controller()
export class DocumentsController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('documents')
  async getDocuments(@Query('userId') userId: string): Promise<Document[]> {
    console.log('userId', userId);
    const result = await this.documentService.getDocuments(userId);
    console.log('result', result);
    return result;
  }

  @Get('document')
  async getDocument(
    @Query('userId') userId: string,
    @Query('documentId') documentId: string,
  ): Promise<Document> {
    console.log('userId', userId, 'documentId', documentId);
    const result = await this.documentService.getDocument(userId, documentId);
    console.log('result', result);
    return result;
  }

  @Post('document')
  async createDocument(@Body('userId') userId: string): Promise<Document> {
    // TODO: この記事を読んで型を改善
    // https://zenn.dev/happou31/articles/2cc0f62ac50f7e
    console.log('userId', userId);
    const result = await this.documentService.createDocument(userId);
    console.log('result', result);
    return result;
  }

  @Put('document')
  async updateDocument(@Body() document: Document): Promise<boolean> {
    console.log('document', document);
    const result = await this.documentService.updateDocument(document);
    console.log('result', result);
    return result;
  }
}
