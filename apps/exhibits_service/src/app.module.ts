import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { BeetrootServicesModule } from './beetroot-services/beetroot-services.module';
import { SocketServicesModule} from './sockets-gateway/socket-services.module'
@Module({
  imports: [
    CommonModule , 
    BeetrootServicesModule,
    forwardRef(() => SocketServicesModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
