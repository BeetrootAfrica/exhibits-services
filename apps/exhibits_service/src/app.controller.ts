import { AppService } from './app.service';
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload, Ctx, Transport } from '@nestjs/microservices';
import { ConsumerService } from './kafka/Consumer.service';
import { ProucerService } from './kafka/Producer.service';
import { WPService } from './beetroot-services/wp';


@Controller('exhibits-service')
export class AppController {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly producerService: ProucerService, 
    private readonly wpServiceService: WPService,

    private readonly consumerService: ConsumerService,
    private readonly appService: AppService) {}


    // @MessagePattern('consume-kafka-topic')
    // async consumeKafkaTopic() {
    //   // Consume data with a specific Kafka topic
    //   await this.consumerService.consume(
    //     { topics: ['test'] },
    //     {
    //       eachMessage: async ({ topic, partition, message }) => {
    //         console.log({
    //           value: message.value.toString(),
    //           topic: topic.toString(),
    //           partition: partition.toString(),
    //         });
    //       },
    //     },
    //   );
    // }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  private fibonacci (n: number){
    return n < 1 ? 0 : n <= 2 ? 1 : this.fibonacci(n - 1) + this.fibonacci(n - 2);
  };

  @MessagePattern('fibo')
  getFibonacci(@Payload() message: { num: number }) {
    const { num } = message;
    console.log('this.fibonacci(num)',this.fibonacci(num))
    return this.fibonacci(num);
  }

  @MessagePattern('get-posts')
  async consumeMessage(payload: any):Promise<any> {
    console.log('get-posts:', payload);
    const result = 'Processed successfully';
    const posts = await this.wpServiceService.fetchPosts();
    console.log('getPosts rsp');
    if (posts) {
      const successData = {
        status: 200,
        data: JSON.stringify(posts),
        error: null,
        errorMessage: null,
        successMessage: 'success',
      };
      // console.log('wpServiceService.fetchDataAndStore successData posts.length', posts.length);
      // console.log('wpServiceService.fetchDataAndStore successData posts 1', posts[0]);

      return successData;
    }

  // return posts;
  }
  @Post('postConnection')
  async postConnection(@Body() postConnection){
    console.log('postConnection', postConnection)

  }
  @Get('produce-message')
  produceMessage() {
    const pattern = 'produce-message';
    const data = 'Hello from producer!';

    return { pattern, data };
  }
}
