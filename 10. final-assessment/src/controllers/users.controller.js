import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserController {
  addUser = async (req, res, next) => {
    try {
      if (!req.body.role_id) {
        const userRole = await prisma.role.findUniqueOrThrow({
          where: {
            name: 'user'
          }
        })

        req.body.role_id = userRole.id;
      }

      const newUser = await prisma.user.create({
        data: req.body
      })

      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  }

  getUsers = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  findUser = async (req, res, next) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      await prisma.user.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      const updatedUser = await prisma.user.update({
        data: req.body,
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      await prisma.user.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      const deletedUser = await prisma.user.delete({
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();