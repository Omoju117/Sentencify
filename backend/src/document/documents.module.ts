import { Module } from '@nestjs/common';
import { DocumentService } from 'src/document/documentService';
import { ExecuteQueryService } from 'src/services/executeQuery.service';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentService, ExecuteQueryService],
})
export class DocumentsModule {}
