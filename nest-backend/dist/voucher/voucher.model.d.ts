export declare class Voucher {
    id: string;
    type: string;
    price: number;
    startDate: string;
    endDate: string;
    subscribeDates: string[];
    constructor(id: string, type: string, price: number, startDate: string, endDate: string, subscribeDates: string[]);
}
