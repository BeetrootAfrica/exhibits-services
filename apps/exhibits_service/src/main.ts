import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(
    {
      
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `exhibits`,
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'exhibits-group',
        },
      },
    },
    { inheritAppConfig: true },
  );  
  
  const cors = {
    origin: "*",
  };
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addServer('http://localhost:4006/', 'Local environment')
    .addServer('https://staging.sme_erp.systems/', 'Staging')
    .addServer('https://production.sme_erp.systems/', 'Production')
    .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors(cors);
  await app.startAllMicroservices();
  await app.listen(4006);
}

bootstrap();
