/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConvertCurrenciesDto } from './dto/convertCurrencies.dto';
import { HandleQueryDto } from './dto/handlequery.dto';
import { searchProducts } from './dto/searchProduct.dto';

dotenv.config();

const testApiKey = process.env.OPENAI_API_KEY ? '🚀 API Key Loaded' : 'ERROR: API Key not found';
console.log(testApiKey);

// Op1 - Absolute Path:
const productsFilePath = path.resolve(process.cwd(), 'products_list.json');
// Op2 - Relative path:
// const productsFilePath = path.resolve(__dirname, '../../products_list.json');

let productsList = [];

if (fs.existsSync(productsFilePath)) {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    productsList = JSON.parse(productsData);
    console.log("🚀 productsList data length:", productsList.length)
} else {
    console.error('Products file not found');
}

@ApiTags('chatbot')
@Injectable()
export class ChatbotService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    @ApiOperation({ summary: 'Handle user query' })
    async handlequery(queryDto: HandleQueryDto): Promise<string> {
        const query = queryDto.query;
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
                model: 'gpt-4o',
                messages: messages,
                tools: tools,
                tool_choice: 'auto',
            })

            const responseMessage = response.choices[0].message;
            console.log("🚀 #1 -First response:", responseMessage)

            messages.push(responseMessage);

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
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: functionResponse,
                    });

                }

                const secondResponse = await this.openai.chat.completions.create({
                    model: 'gpt-4o',
                    messages: messages,
                });
                console.log("🚀#2 - Second response:", secondResponse.choices[0].message.content)

                return secondResponse.choices[0].message.content;
            } else {
                return responseMessage.content // Op1 response
                // return 'Sorry, I could not understand your request.'; // Op2 response
            }

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error('Exceeded quota:', error.message);
                return 'Sorry, we are currently experiencing high demand. Please try again later.';
            }
            throw error;
        }

    }

    @ApiOperation({ summary: 'User query string' })
    async searchProducts(args: searchProducts): Promise<string> {
        console.log("🚀 searchProducts ~ args:", args)
        const searchQuery = args.query.toLowerCase();
        const filterProducts = productsList.filter(product =>
            product.displayTitle.toLowerCase().includes(searchQuery) ||
            product.embeddingText.toLowerCase().includes(searchQuery));

        const result = filterProducts.slice(0, 2);
        console.log("🚀 searchProducts:", result[0].displayTitle)
        return JSON.stringify(result);
    }

    @ApiOperation({ summary: 'Convert currencies' })
    async convertCurrencies(args: ConvertCurrenciesDto): Promise<string> {
        console.log("🚀 convertCurrencies ~ args:", args)
        try {
            const response = await axios.get('https://openexchangerates.org/api/latest.json', {
                params: {
                    app_id: process.env.OPEN_EXCHANGE_APP_ID,
                },
            });

            const rates = response.data.rates;
            const exchangeRate = rates[args.toCurrency]
            const convertedAmount = args.amount * exchangeRate;
            return JSON.stringify({ convertedAmount })
        } catch (error) {
            console.error('Error converting currencies:', error.message);
            return 'Error converting currencies. Please try again later.';
        }
    }
}