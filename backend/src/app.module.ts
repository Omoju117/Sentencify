import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './document/documents.module';
import { TranslationsModule } from './translations/translations.module';

@Module({
  imports: [DocumentsModule, TranslationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
