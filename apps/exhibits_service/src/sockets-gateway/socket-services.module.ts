import { Module, forwardRef } from '@nestjs/common';
// import SearchService from '../search/search.service';
import { SocketService } from './service';
import { HttpModule } from '@nestjs/axios';
// import { SearchModule } from '../search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectedUser } from './entities/connected-user.entity';
import {SocketsGateway} from './gateway'
@Module({
  imports: [
    forwardRef(() => HttpModule),
    TypeOrmModule.forFeature([
      ConnectedUser,
    ]),
  ],
  controllers: [],
  exports: [TypeOrmModule],
  providers: [SocketsGateway, SocketService],
})
export class SocketServicesModule {}
