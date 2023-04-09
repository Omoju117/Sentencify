import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './document/documents.module';
import { TranslationsModule } from './translations/translations.module';
import { UserModule } from './user/user.module';
import { OpenAiModule } from './open-ai/open-ai.module';

@Module({
  imports: [DocumentsModule, TranslationsModule, UserModule, OpenAiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
