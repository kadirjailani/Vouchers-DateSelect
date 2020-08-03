export class Voucher {
    constructor(
        public id: string, 
        public type: string, 
        public price: number,
        public startDate: string,
        public endDate: string
        ) {}
}