/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ConvertCurrenciesDto {
    @ApiProperty({ description: 'Amount of money' })
    amount: number;

    @ApiProperty({ description: 'Source currency' })
    fromCurrency: string;

    @ApiProperty({ description: 'Target currency' })
    toCurrency: string;
}
