import { db } from "../database/connection";

export const CourseModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM courses");
    return rows;
  },

  getById: async (id: number) => {
    const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [id]);
    return rows;
  },

  create: async (name: string, description: string) => {
    const [result] = await db.query(
      "INSERT INTO courses (name, description) VALUES (?, ?)",
      [name, description]
    );
    return result;
  },

  update: async (id: number, name: string, description: string) => {
    const [result] = await db.query(
      "UPDATE courses SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    return result;
  },

  delete: async (id: number) => {
    const [result] = await db.query("DELETE FROM courses WHERE id = ?", [id]);
    return result;
  }
};
