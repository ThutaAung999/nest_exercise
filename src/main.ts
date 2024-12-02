import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './logging/logging.interceptor';
//  import { HttpExceptionFilter } from './http-exception/http-exception.filter';
//import { logger } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Global Middleware
  //app.use(logger);
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
