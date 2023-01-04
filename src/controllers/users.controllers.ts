import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //! to get the user information with every request he make
    // const userInfo = req.body.user;
    // console.log(userInfo['id']);
    const users = await userModel.getMany(req);
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

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'The username or password do not match please try again'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: { ...user, token },
      message: 'User successfully authenticated'
    });
  } catch (error) {
    return next(error);
  }
};
