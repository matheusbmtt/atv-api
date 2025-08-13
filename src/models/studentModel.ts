import { db } from "../database/connection";

export const StudentModel = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT students.*, courses.name AS course_name
      FROM students
      LEFT JOIN courses ON students.course_id = courses.id
    `);
    return rows;
  },

  getById: async (id: number) => {
    const [rows] = await db.query(`
      SELECT students.*, courses.name AS course_name
      FROM students
      LEFT JOIN courses ON students.course_id = courses.id
      WHERE students.id = ?
    `, [id]);
    return rows;
  },

  create: async (name: string, email: string, course_id: number) => {
    const [result] = await db.query(
      "INSERT INTO students (name, email, course_id) VALUES (?, ?, ?)",
      [name, email, course_id]
    );
    return result;
  },

  update: async (id: number, name: string, email: string, course_id: number) => {
    const [result] = await db.query(
      "UPDATE students SET name = ?, email = ?, course_id = ? WHERE id = ?",
      [name, email, course_id, id]
    );
    return result;
  },

  delete: async (id: number) => {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
    return result;
  }
};
