import { VouchersServices } from "./vouchers.service";
export declare class VouchersController {
    private vouchersService;
    constructor(vouchersService: VouchersServices);
    addVoucher(voucherType: string, voucherPrice: number, voucherStartDate: string, voucherEndDate: string): {
        id: string;
    };
    getAllVouchers(): import("./voucher.model").Voucher[];
}
