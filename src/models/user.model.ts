import User from '../types/user.type';
import db from '../database';
import * as Validator from 'validatorjs';
class UserModel {
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, password)
        VALUES ($1, $2) returning email`;
      const result = await connection.query(sql, [u.email, u.password]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create user (${u.email}): ${(error as Error).message}`
      );
    }
  }
}
export default UserModel;
