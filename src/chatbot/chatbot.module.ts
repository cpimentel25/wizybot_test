/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { OpenExchangeModule } from 'src/openexchange/openexchange.module';

@Module({
  imports: [OpenExchangeModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule { }
