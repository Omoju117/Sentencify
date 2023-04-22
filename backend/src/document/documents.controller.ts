import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { Document } from 'schemas';
import { DocumentService } from 'src/document/documentService';
import { JwtService } from 'src/services/jwt.service';
import { Request } from 'express';

// TODO: この記事を読んで型を改善
// https://zenn.dev/happou31/articles/2cc0f62ac50f7e
@Controller()
export class DocumentsController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('documents')
  async getDocuments(@Req() request: Request): Promise<Document[]> {
    console.log('request.cookies: ', request.cookies);
    let result = null;
    const userEmail = await this.jwtService.getIdFromToken(
      request.cookies['token'] ?? undefined,
    );
    if (userEmail) {
      result = await this.documentService.getDocuments(userEmail);
    }
    // TODO: error handling
    console.log('result', result);
    return result;
  }

  @Get('document')
  async getDocument(
    @Query('documentId') documentId: string,
  ): Promise<Document> {
    // TODO: implement JWT authentication as middleware
    const result = await this.documentService.getDocument(documentId);
    console.log('result', result);
    return result;
  }

  @Post('document')
  async createDocument(@Req() request: Request): Promise<Document> {
    let result = null;
    const userEmail = await this.jwtService.getIdFromToken(
      request.cookies['token'] ?? undefined,
    );
    if (userEmail) {
      // OpenAIで別の文を生成した文で新規作成する場合
      // TODO: 翻訳処理実装
      const newSentence = request.body.sentence ?? '';
      result = await this.documentService.createDocument(
        userEmail,
        newSentence,
      );
    }
    console.log('result', result);
    return result;
  }

  @Put('document')
  async updateDocument(@Body() document: Document): Promise<boolean> {
    const result = await this.documentService.updateDocument(document);
    console.log('result', result);
    return result;
  }
}
