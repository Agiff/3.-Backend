import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserController {
  addUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) throw new Error('Bad Request');

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password
        }
      })
      
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  getUsers = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  findUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirstOrThrow({
        where: { id: Number(id) }
      });

      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  getUserPosts = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userFound = await prisma.user.findUnique({
        where: { id: Number(id) }
      });

      if (!userFound) throw new Error('User not found');

      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { posts: true }
      });

      res.status(200).send(user.posts);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export const userController = new UserController();