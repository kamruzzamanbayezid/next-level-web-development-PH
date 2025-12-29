import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { Response } from "express";
import config from "../../config";

const userLogin = async (email: string, password: string, res: Response) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result?.rows.length === 0) return null;

  const user = result?.rows[0];

  const match = await bcrypt.compare(password, user?.password);

  if (!match) {
    return res.status(401).json({ message: "Password isn't match" });
  }

  const payload = {
    name: user?.name,
    role: user?.role,
    email: user?.email,
  };
  const secret = config.jwt_secret as string;
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return { user, token };
};

export const authServices = {
  userLogin,
};
