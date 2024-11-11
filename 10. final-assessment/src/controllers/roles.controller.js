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
      const roles = await prisma.role.findMany();
      res.status(200).send(roles);
    } catch (error) {
      next(error);
    }
  }

  findRole = async (req, res, next) => {
    try {
      const role = await prisma.role.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(role);
    } catch (error) {
      next(error);
    }
  }

  updateRole = async (req, res, next) => {
    try {
      await prisma.role.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      const updatedRole = await prisma.role.update({
        data: req.body,
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(updatedRole);
    } catch (error) {
      next(error);
    }
  }

  deleteRole = async (req, res, next) => {
    try {
      await prisma.role.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      const deletedRole = await prisma.role.delete({
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(deletedRole);
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();