import { Injectable } from "@nestjs/common";

import { Voucher } from "./voucher.model";

@Injectable()
export class VouchersServices {
    private vouchers: Voucher[] = [];

    addVouchers(type: string, price: number, startDate: string, endDate: string) {

        const id = Date.now().toString();
        const newVoucher = new Voucher(id, type, price, startDate, endDate);
        this.vouchers.push(newVoucher);
        return id;
    }

    getVouchers() {
        return [...this.vouchers]
    }
}