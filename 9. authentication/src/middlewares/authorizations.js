import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userAuthorization = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: resourcesId } = req.params;
    const resourcesType = req.baseUrl.split('/')[1];
    
    
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId
      }
    })

    let hasAccess = false;

    switch (resourcesType) {
      case 'posts':
        const post = await prisma.post.findUniqueOrThrow({
          where: {
            id: Number(resourcesId)
          }
        })

        if (post.user_id === user.id) hasAccess = true;
        break;

      case 'comments':
        const comment = await prisma.comment.findUniqueOrThrow({
          where: {
            id: Number(resourcesId)
          }
        })

        if (comment.user_id === user.id) hasAccess = true;
        break;
    }

    if (!hasAccess) throw { name: 'UnauthorizedError', message: 'You are not authorized.' }
    
    next();
  } catch (error) {
    next(error);
  }
}