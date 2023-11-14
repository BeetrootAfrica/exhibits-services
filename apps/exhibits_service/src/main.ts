import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AsklessClient } from "askless-js-client/node";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    origin: "*",
  };
  // AsklessClient.instance.init({
  //   serverUrl: 'ws://172.23.177.0:3000',
  //   projectName: 'beetroot-app',
  // });
  
  // AsklessClient.instance.connect();
  // let auth = await AsklessClient.instance
  //   .create({ route: "login", body: { "email": 'greats@gmail.com', "password": 'greats' } });
  // console.log('auth', auth)
  // console.log('AsklessClient.instance.connection', AsklessClient.instance.connection)
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
  await app.listen(4006);
}

bootstrap();
