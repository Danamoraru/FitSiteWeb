import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(4005);

  console.log('FitBook ruleaza pe http://localhost:4005');
}

bootstrap();