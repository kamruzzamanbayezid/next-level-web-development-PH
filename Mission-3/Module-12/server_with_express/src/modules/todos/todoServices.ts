import { pool } from "../../config/db";

const createTodos = async (user_id: string, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
    [user_id, title]
  );
  return result;
};

const getTodos = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getTodoById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
  return result;
};

const updateTodoById = async (title: string, id: number) => {
  const result = await pool.query(
    `UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
    [title, id]
  );
  return result;
};

const deleteTodoById = async (id: number) => {
  const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
  return result;
};

export const todoServices = {
  createTodos,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
