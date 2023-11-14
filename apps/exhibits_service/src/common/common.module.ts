/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { DatabaseModule } from './database.module';

// eslint-disable-next-line prettier/prettier
@Module({
  imports: [ConfigModule, DatabaseModule,],
  exports: [ConfigModule, DatabaseModule,],
})
export class CommonModule {}
