import config from '../config';
import jwt from 'jsonwebtoken';
import Error from '../interfaces/error.interface';
import { NextFunction, Request, Response } from 'express';
import User from '../types/user.type';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error: Please try again');
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    //Get AuthHeader // This to get the user information
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader?.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );

        //! Fucken Critical Mother Fuckers Idiots
        const user: User = Object.values(decode)[0];

        if (decode) {
          req.body.user = user;
          next();
        } else {
          //Failed to authenticate user
          handleUnauthorizedError(next);
        }
      } else {
        //Token type not bearer or no token
        handleUnauthorizedError(next);
      }
    } else {
      handleUnauthorizedError(next);
    }
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default validateTokenMiddleware;
