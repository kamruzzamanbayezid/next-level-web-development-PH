import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

const userLogin = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result?.rows?.length === 0) {
    console.log("I am from o length");

    return null;
  }

  const user = result?.rows[0];

  const match = await bcrypt.compare(password, user?.password);

  if (!match) return false;

  const payload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };
  const token = jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: "7d",
  });

  return { token, user };
};

export const authServices = {
  userLogin,
};
