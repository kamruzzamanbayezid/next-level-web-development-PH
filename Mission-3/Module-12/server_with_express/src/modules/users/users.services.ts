import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createUser = async (
  name: string,
  role: string,
  email: string,
  password: string
) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,role,email,password) VALUES($1,$2,$3,$4) RETURNING *`,
    [name,role, email, hashPassword]
  );
  return result;
};

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getUserById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUserById = async (name: string, email: string, id: number) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );
  return result;
};

const deleteUserById = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
