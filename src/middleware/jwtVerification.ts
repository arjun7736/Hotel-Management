import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/error';

interface JwtPayload {
  id: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: string;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw new CustomError(401, 'Unauthorized');
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    throw new CustomError(401, 'Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    req.user = decoded.id;
    next();
  } catch (err) {
    throw new CustomError(403, 'Invalid Token');
  }
};

export default verifyToken;
