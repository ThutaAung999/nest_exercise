import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Auth Guard :', request.headers);

    return this.validateRequest(request);
    // return false;
  }

  private validateRequest(request: Request): boolean {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      return false;
    }
    return true;
  }
}
