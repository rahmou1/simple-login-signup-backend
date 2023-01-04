import User from '../types/user.type';
import db from '../database';

class UserModel {
  // Create New User
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, password)
        VALUES ($1, $2) returning id, email`;
      const result = await connection.query(sql, [u.email, u.password]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create user (${u.email}): ${(error as Error).message}`
      );
    }
  }
  // Get All Users
  async getMany(): Promise<User[]> {
    try {
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
      const result = await connection.query(sql, [u.email, u.password, u.id]);
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
}
export default UserModel;
