import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.auth_token) {
        try {
          const decodedToken = verify(req.cookies.auth_token, "cat") as { email: string }

          req.user = {
            email: decodedToken.email,
          }
        }
        catch (error) {
          console.error(error)
        }
    }
    next();
  }
}
