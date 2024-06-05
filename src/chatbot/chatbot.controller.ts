/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}

    @Post()
    async handleUserQuery(@Body('query') query: string): Promise<string> {
        return this.chatbotService.handlequery(query)
    }
}
