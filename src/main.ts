import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // AppModule is our root module which contains other modules 
  await app.listen(3000);
}
bootstrap();
