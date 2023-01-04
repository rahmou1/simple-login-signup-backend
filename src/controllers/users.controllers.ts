import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    //res.set('Access-Control-Allow-Origin', '*')
    res.status(200).json({
      status: 'success',
      data: { ...user },
      message: 'User Created Successfully'
    });
  } catch (error) {
    next(error);
  }
};
