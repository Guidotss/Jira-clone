import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap'); 
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.setGlobalPrefix('api/v1');
  app.enableCors(); 
  await app.listen(process.env.PORT || 3001);
  logger.log(`Application listening on port ${ process.env.PORT }`);
}
bootstrap();
