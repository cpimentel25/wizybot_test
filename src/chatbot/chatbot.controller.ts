/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { HandleQueryDto } from './dto/handlequery.dto';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Post()
    async handleUserQuery(@Body() body: HandleQueryDto): Promise<string> {
        return this.chatbotService.handlequery(body)
    }
}
