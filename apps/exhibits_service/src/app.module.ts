import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { BeetrootServicesModule } from './beetroot-services/beetroot-services.module';
import { SocketServicesModule} from './sockets-gateway/socket-services.module'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/test.consumer';
import { WPService } from './beetroot-services/wp';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXHIBITS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'exhibits',
            brokers: [`localhost:${+process.env.KAFKA_PORT}`], // Update with your Kafka broker address
          },
          consumer: {
            groupId: 'exhibits-group',
          },
        },
      },
    ]),
    KafkaModule,

    CommonModule , 
    // BeetrootServicesModule, 
    forwardRef(() => SocketServicesModule),
    forwardRef(() => BeetrootServicesModule),
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer, WPService],
})
export class AppModule {}
