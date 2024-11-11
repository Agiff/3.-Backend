import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RoleController {
  addRole = async (req, res, next) => {
    try {
      const newRole = await prisma.role.create({
        data: req.body
      })

      res.status(201).send(newRole);
    } catch (error) {
      next(error);
    }
  }

  getRoles = async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }

  findRole = async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }

  updateRole = async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }

  deleteRole = async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();