import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (
  name: string,
  role: string,
  email: string,
  password: string
) => {
  const hashedPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,role,email,password) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, role, email, hashedPass]
  );
  return result;
};

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getUserById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result;
};

const updateUserById = async (id: string, name: string) => {
  const result = await pool.query(
    `UPDATE users SET name=$1 WHERE id=$2 RETURNING *`,
    [name, id]
  );
  return result;
};

const deleteUserById = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
