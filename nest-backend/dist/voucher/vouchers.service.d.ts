import { Voucher } from "./voucher.model";
export declare class VouchersServices {
    private vouchers;
    addVouchers(type: string, price: number, startDate: string, endDate: string, subscribeDates: string[]): string;
    getVouchers(): Voucher[];
}
