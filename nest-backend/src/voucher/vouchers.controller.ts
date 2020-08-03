import { Controller, Post, Body, Get } from "@nestjs/common";
import { VouchersServices } from "./vouchers.service";

@Controller('vouchers')
export class VouchersController {
    constructor(private vouchersService: VouchersServices) {}

    @Post()
    addVoucher(
        @Body('type') voucherType: string,
        @Body('price') voucherPrice: number,
        @Body('startDate') voucherStartDate: string,
        @Body('endDate') voucherEndDate: string
    ) {
        const generatedID = this.vouchersService.addVouchers(voucherType, voucherPrice, voucherStartDate, voucherEndDate);
        return { id: generatedID };
    }

    @Get()
    getAllVouchers () {
        return this.vouchersService.getVouchers();
    }
}