/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class HandleQueryDto {
    @ApiProperty({ description: 'The user query' })
    query: string;
}
