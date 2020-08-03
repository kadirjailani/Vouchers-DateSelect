"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VouchersServices = void 0;
const common_1 = require("@nestjs/common");
const voucher_model_1 = require("./voucher.model");
let VouchersServices = class VouchersServices {
    constructor() {
        this.vouchers = [];
    }
    addVouchers(type, price, startDate, endDate) {
        const id = Date.now().toString();
        const newVoucher = new voucher_model_1.Voucher(id, type, price, startDate, endDate);
        this.vouchers.push(newVoucher);
        return id;
    }
    getVouchers() {
        return [...this.vouchers];
    }
};
VouchersServices = __decorate([
    common_1.Injectable()
], VouchersServices);
exports.VouchersServices = VouchersServices;
//# sourceMappingURL=vouchers.service.js.map