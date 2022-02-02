import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    return this.validateAuthToken(authHeader);
  }

  private validateAuthToken(authHeader: string) {
    let token;
    if (!(authHeader && (token = authHeader.split(' ')[1]))) {
      throw new UnauthorizedException('Authorization header is required');
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException('Authorization header is invalid');
    }
    return true;
  }
}
