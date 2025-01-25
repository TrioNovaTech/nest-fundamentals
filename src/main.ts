import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // AppModule is our root module which contains other modules 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // removes any additional data that has been sent (meaning not in dto),
    forbidNonWhitelisted: true, // stops the request from being processed if there are any none whitelists proeperties are present
    transform: true // transforming objects that are coming into exactly what we are expecting in dto
  }))
  await app.listen(3000);
}
bootstrap();
