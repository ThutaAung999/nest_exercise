import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { HostController } from './host/host.controller';
import { LibSpecificController } from './lib-specific/lib-specific.controller';
import { logger } from './logger/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
//import { TodoController } from './todo/todo.controller';
//import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [TodoModule],
  controllers: [AppController, HostController, LibSpecificController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(logger).forRoutes(TodoController);
    //consumer.apply(LoggerMiddleware).forRoutes('todo');
    consumer
      .apply(logger)
      .exclude('toto/query')
      .forRoutes({ path: 'todo', method: RequestMethod.GET });
    //forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

//export class AppModule {}
