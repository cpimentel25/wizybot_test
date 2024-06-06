/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotQueryDto } from './chatbot.dto';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Post()
    async handleUserQuery(@Body() body: ChatbotQueryDto): Promise<string> {
        return this.chatbotService.handlequery(body.query)
    }
}
