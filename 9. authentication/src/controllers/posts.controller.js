import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PostController {
  addPost = async (req, res, next) => {
    try {
      const { title, content, user_id } = req.body;

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          user_id: Number(user_id)
        }
      })
      
      res.status(201).send(newPost);
    } catch (error) {
      next(error);
    }
  }

  getPosts = async (req, res, next) => {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  }

  findPost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUniqueOrThrow({
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
      next(error);
    }
  }

  updatePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const postFound = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      // Cannot handle this on errorHandler due to its name to be a constant of "Error"
      // if (!postFound) throw new Error('Post not found'); // err.name = Erroro, err.message = 'Post not found'
      
      if (!postFound) throw { name: 'JavascriptDeveloperClassError', message: 'Aku macan' } // err.name = Erroro, err.message = 'Post not found'

      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          user_id: req.user.id
        }
      });

      res.status(200).send(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.post.findUniqueOrThrow({
        where: { id: Number(id) },
      });

      const deletedPost = await prisma.post.delete({
        where: { id: Number(id) }
      })

      res.status(200).send(deletedPost);
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();