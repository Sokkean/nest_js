import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json(
            {
                status: 401, message: 'Unauthorized' 
            }
        );
    }

    const token = authHeader.split(' ')[1]; // Bearer <TOKEN>
    if (!token) {
        return res.status(401).json(
            {
                status: 401, message: 'Unauthorized' 
            }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!); // ✅ verify JWT
        req['user'] = decoded; // optional: attach user info to request
        next();
    } catch (err) {
        return res.status(403).json(
            {
                status: 403, message: 'Forbidden'
            }
        );
    }
  }
}