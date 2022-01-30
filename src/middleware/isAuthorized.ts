import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '../common/constants';
import { JWT_SECRET_KEY } from '../common/config';

export function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send({ message: 'Authorization header is required' });
  } else {
    const token = authHeader.split(' ')[1];
    if (!authHeader.startsWith('Bearer ') || !token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Unauthorized' });
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        next();
      } catch (error) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: 'Token is not valid' });
      }
    }
  }
}
