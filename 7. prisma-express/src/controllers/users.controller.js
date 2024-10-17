import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserController {
  addUser = async (req, res) => {
    try {
      const { email, password, user_name } = req.body;
    
      const newUser = await prisma.user.create({
        data: {
          email, // the variable need to have the exact same name
          password: password, // this is also fine
          username: user_name
        }
      })

      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  findUser = async (req, res) => {
    try {
      const { id } = req.params;

      const userFound = await prisma.user.findUnique({
        where: { id }
      })

      if (!userFound) return res.status(404).send('User not found');

      res.send(userFound);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, user_name } = req.body;

      const userFound = await prisma.user.findUnique({
        where: { id }
      })

      if (!userFound) return res.status(404).send('User not found');

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          password,
          username: user_name
        }
      })

      console.log(updatedUser);

      res.send(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  removeUser = async (req, res) => {
    try {
      const { id } = req.params;

      const userFound = await prisma.user.findUnique({
        where: { id }
      })

      if (!userFound) return res.status(404).send('User not found');

      const deletedUser = await prisma.user.delete({
        where: { id }
      })

      res.send(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const userController = new UserController();