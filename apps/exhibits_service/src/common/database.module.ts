import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
console.log('process.env.DB_HOST', process.env.DB_HOST)
console.log('process.env.DB_PORT', process.env.DB_PORT)
console.log('process.env.DB_DATABASE', process.env.DB_DATABASE)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
