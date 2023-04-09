import { OpenAiService } from './open-ai.service';
import { Module } from '@nestjs/common';
import { OpenAiController } from './open-ai.controller';

@Module({
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
