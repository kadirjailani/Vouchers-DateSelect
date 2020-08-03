import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VoucherModule } from './voucher/vouchers.module';

@Module({
  imports: [VoucherModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}