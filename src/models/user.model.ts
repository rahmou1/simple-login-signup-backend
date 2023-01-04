import User from '../types/user.type';
import db from '../database';
import { Request } from 'express';
import config from '../config';
import bcrypt from 'bcrypt';
const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
class UserModel {
  // Create New User
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, password)
        VALUES ($1, $2) returning id, email`;
      const result = await connection.query(sql, [
        u.email,
        hashPassword(u.password)
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create user (${u.email}): ${(error as Error).message}`
      );
    }
  }
  // Get All Users
  async getMany(req: Request): Promise<User[]> {
    try {
      // const userInfo = req.body.user;
      // console.log(userInfo);

      const connection = await db.connect();
      const sql = 'SELECT id, email FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }
  // Get Specific User
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email FROM users WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }
  // Update user
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users SET email=$1, password=$2 WHERE id=$3 RETURNING id, email`;
      const result = await connection.query(sql, [
        u.email,
        hashPassword(u.password),
        u.id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not update the user: ${u.email}, ${(error as Error).message}`
      );
    }
  }
  // Delete User
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id, email`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      );
    }
  }

  // User Authentication
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE email=$1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, email FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
}
export default UserModel;
