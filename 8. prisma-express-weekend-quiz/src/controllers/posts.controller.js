import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PostController {
  addPost = async (req, res) => {
    try {
      const { title, content, user_id } = req.body;

      if (!title || !content || !user_id) throw new Error('Bad Request');

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          user_id: Number(user_id)
        }
      })
      
      res.status(201).send(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  findPost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findFirstOrThrow({
        where: { id: Number(id) },
        include: {
          author: true,
          comments: {
            orderBy: {
              created_at: 'desc'
            }
          }
        }
      });

      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, user_id } = req.body;

      const postFound = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (!postFound) throw new Error('Post not found');

      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          user_id: Number(user_id)
        }
      });

      res.status(200).send(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.post.findFirstOrThrow({
        where: { id: Number(id) },
      });

      const deletedPost = await prisma.post.delete({
        where: { id: Number(id) }
      })

      res.status(200).send(deletedPost);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export const postController = new PostController();