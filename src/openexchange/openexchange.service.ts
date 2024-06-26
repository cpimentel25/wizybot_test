/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenExchangeService {
    private readonly BASE_URL = 'https://openexchangerates.org/api';
    private readonly APP_ID = process.env.OPEN_EXCHANGE_APP_ID;

    async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
        try {
            const response = await axios.get(`${this.BASE_URL}/latest.json`, {
                params: {
                    app_id: this.APP_ID,
                    base: fromCurrency,
                },
            });

            const rates = response.data.rates;
            const exchangeRate = rates[toCurrency];
            if (!exchangeRate) {
                throw new Error(`Exchange rate for ${toCurrency} not found.`);
            }
            return exchangeRate;
        } catch (error) {
            console.error('Error fetching exchange rate:', error.message);
            throw new Error('Could not fetch exchange rate.');
        }
    }
}
