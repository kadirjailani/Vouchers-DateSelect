import { Module } from "@nestjs/common";
import { VouchersController } from "./vouchers.controller";
import { VouchersServices } from "./vouchers.service";

@Module({
    controllers: [VouchersController],
    providers: [VouchersServices],
})

export class VoucherModule{}