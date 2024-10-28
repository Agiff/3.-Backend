import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";
const prisma = new PrismaClient();

class UserController {
  register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) throw new Error('Bad Request');

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
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
      const { username, email, password } = req.body;

      if (!password || (!email && !username)) throw new Error('Bad Request');

      let user;

      if (email) {
        user = await prisma.user.findUnique({
          where: {
            email
          }
        })
      }

      if (!user && username) {
        user = await prisma.user.findUnique({
          where: {
            username
          }
        })
      }

      if (!user) throw new Error('User not found');
      const validatedUser = await comparePassword(password, user.password);

      if (!validatedUser) throw new Error('Password is invalid')

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username
      }

      const access_token = generateAccessToken(payload);
      
      res.send({ access_token });
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
      const { id } = req.params;
      const user = await prisma.user.findFirstOrThrow({
        where: { id: Number(id) }
      });

      res.status(200).send(user);
    } catch (error) {
      next(error);
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
      next(error);
    }
  }
}

export const userController = new UserController();