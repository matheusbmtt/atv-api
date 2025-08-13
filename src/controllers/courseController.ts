import { Request, Response } from "express";
import { CourseModel } from "../models/courseModel";

export const CourseController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const courses = await CourseModel.getAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar cursos" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      // Validar se o id é um número válido
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const courses = await CourseModel.getById(id);

      // Se não encontrou o curso, retorna erro 404
      if (!Array.isArray(courses) || courses.length === 0) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      // Retorna o primeiro curso encontrado
      return res.json(courses[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar curso" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      await CourseModel.create(name, description);
      res.status(201).json({ message: "Curso criado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar curso" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name, description } = req.body;
      await CourseModel.update(id, name, description);
      res.json({ message: "Curso atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar curso" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await CourseModel.delete(id);
      res.json({ message: "Curso excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir curso" });
    }
  }
};
