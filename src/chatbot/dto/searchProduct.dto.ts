/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class searchProducts {
    @ApiProperty({ description: 'Convert currencies' })
    query: string;
}
