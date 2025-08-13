import { Request, Response } from "express";
import { StudentModel } from "../models/studentModel";

export const StudentController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const students = await StudentModel.getAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar alunos" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      // Validar se o ID é um número válido
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const students = await StudentModel.getById(id);

      // Verificar se retorno é array preenchido
      if (!Array.isArray(students) || students.length === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      // Retornar o primeiro aluno encontrado
      return res.json(students[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar aluno" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { name, email, course_id } = req.body;
      await StudentModel.create(name, email, course_id);
      res.status(201).json({ message: "Aluno criado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar aluno" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name, email, course_id } = req.body;
      await StudentModel.update(id, name, email, course_id);
      res.json({ message: "Aluno atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar aluno" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await StudentModel.delete(id);
      res.json({ message: "Aluno excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir aluno" });
    }
  }
};
