/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const testApiKey = process.env.OPENAI_API_KEY ? '🚀 API Key Loaded' : 'ERROR: API Key not found';
console.log(testApiKey);

@Injectable()
export class ChatbotService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async handlequery(query: string): Promise<string> {
        try {
            const messages: OpenAI.ChatCompletionMessageParam[] = [{ role: 'user', content: query }];
            const tools: OpenAI.ChatCompletionTool[] = [
                {
                    type: 'function',
                    function: {
                        name: 'searchProducts',
                        description: 'Search for products based on a query',
                        parameters: {
                            type: 'object',
                            properties: {
                                query: { type: 'string', description: 'The search query' },
                            },
                            required: ['query'],
                        },
                    },
                },
                {
                    type: 'function',
                    function: {
                        name: 'convertCurrencies',
                        description: 'Convert amount from one currency to another',
                        parameters: {
                            type: 'object',
                            properties: {
                                amount: { type: 'number', description: 'Amount of money' },
                                fromCurrency: { type: 'string', description: 'Source currency' },
                                toCurrency: { type: 'string', description: 'Target currency' },
                            },
                            required: ['amount', 'fromCurrency', 'toCurrency'],
                        },
                    },
                },
            ];

            // const prompt = `A user asks: ${query}. You have the following functions available: ${tools
            //     .map((tool) => `${tool.name}(${tool.parameters.join(', ')})`)
            //     .join(', ')}. Indicate wich function you want to use to solve the users enquiry`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
                tools: tools,
                tool_choice: 'auto',
            })

            console.log("🚀 ~ handlequery ~ completion :", response)
            const responseMessage = response.choices[0].message;
            const toolCalls = responseMessage.tool_calls;

            if (toolCalls && toolCalls.length > 0) {
                const availableFunctions = {
                    searchProducts: this.searchProducts,
                    convertCurrencies: this.convertCurrencies,
                };

                for (const toolCall of toolCalls) {
                    const functionName = toolCall.function.name;
                    const functionToCall = availableFunctions[functionName];
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    const functionResponse = await functionToCall(functionArgs);

                    messages.push({
                        tool_call_id: toolCall.id,
                        role: 'tool',
                        // name: functionName,
                        content: functionResponse,
                    });

                }

                const secondResponse = await this.openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: messages,
                });

                return secondResponse.choices[0].message.content;
            } else {
                return 'Sorry, I could not understand your request.';
            }

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error('Exceeded quota:', error.message);
                return 'Sorry, we are currently experiencing high demand. Please try again later.';
            }
            throw error;
        }

    }

    async searchProducts(args: { query: string }): Promise<string> {
        // Simulate a product search
        const products = [{ id: 1, name: 'Widget', description: 'A useful widget' }];
        return JSON.stringify(products);
    }

    async convertCurrencies(args: { amount: number, fromCurrency: string, toCurrency: string }): Promise<string> {
        // Simulate currency conversion
        const result = { convertedAmount: args.amount * 1.1 }; // Simulated conversion rate
        return JSON.stringify(result);
    }

}