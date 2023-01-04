import { NextFunction, Request, Response } from 'express';
import validator from '../helper/validate';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    email: 'required|string|email',
    password: 'required|string|min:6'
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

export default signup;
