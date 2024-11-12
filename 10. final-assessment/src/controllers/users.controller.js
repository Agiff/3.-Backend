import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const prisma = new PrismaClient();

class UserController {
  register = async (req, res, next) => {
    try {
      if (!req.body.role_id) {
        const userRole = await prisma.role.findUniqueOrThrow({
          where: {
            name: 'user'
          }
        })

        req.body.role_id = userRole.id;
      }

      if (!req.body.password) throw { name: 'ValidationError', message: 'Password is required' };

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = await prisma.user.create({
        data: {
          ...req.body,
          password: hashedPassword
        }
      })

      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  }

  login = async (req, res, next) => {
    try {
      if (!req.body.email) throw { name: 'ValidationError', message: 'Email is required' };
      if (!req.body.password) throw { name: 'ValidationError', message: 'Password is required' };

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      });

      if (!user) throw { name: 'Unauthenticated', message: 'Login credentials is not valid' };

      const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

      if (!passwordIsValid) throw { name: 'Unauthenticated', message: 'Login credentials is not valid' };

      const payload = { id: user.id };

      const access_token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);

      res.status(200).send({ access_token });
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

      let hashedPassword;

      if (req.body.password) {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await prisma.user.update({
        data: {
          ...req.body,
          password: hashedPassword ? hashedPassword : undefined
        },
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