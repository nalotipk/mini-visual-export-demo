import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow frontend on localhost:3000 to call this backend
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(3001);
}
bootstrap();

