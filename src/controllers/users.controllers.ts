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
    res.status(200).json({
      status: 'success',
      data: { ...user },
      message: 'User Created Successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany();
    res.status(200).json({
      status: 'success',
      data: users,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.status(200).json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.status(200).json({
      status: 'success',
      data: user,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
