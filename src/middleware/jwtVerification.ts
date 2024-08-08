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
    const token = req.cookies['token'];

    if (!token) {
        throw new CustomError(401, 'Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.user = decoded.id;
        next();
    } catch (err) {
        throw new CustomError(403,"Invalied Token")
    }
    };

    export default verifyToken;
