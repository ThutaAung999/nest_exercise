//import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/* @Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('hello welcome to logger moddleware');
    console.log(req.headers);
    next();
  }
} */

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('hello welcome to logger middleware');
  console.log(req.headers);
  next();
}
