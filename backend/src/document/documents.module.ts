import { TranslationsService } from 'src/translations/translations.service';
import { Module } from '@nestjs/common';
import { DocumentService } from 'src/document/documentService';
import { ExecuteQueryService } from 'src/services/executeQuery.service';
import { JwtService } from 'src/services/jwt.service';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentService,
    ExecuteQueryService,
    JwtService,
    TranslationsService,
  ],
})
export class DocumentsModule {}
