import { Module } from '@nestjs/common';
import { DocumentService } from 'src/document/documentService';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentService],
})
export class DocumentsModule {}
