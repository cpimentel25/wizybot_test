/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { OpenExchangeService } from "./openexchange.service";

@Module({
    providers: [OpenExchangeService],
    exports: [OpenExchangeService]
})
export class OpenExchangeModule { }