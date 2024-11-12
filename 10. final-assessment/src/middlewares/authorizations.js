import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userAuthorization = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: resourceId } = req.params;
    const resourceType = req.baseUrl.split('/').at(-1);

    let hasAccess = false;

    switch (resourceType) {
      case 'users':
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: Number(resourceId)
          }
        })

        if (user.id === userId) hasAccess = true;
        break;
      
      case 'profiles':
        const profile = await prisma.profile.findUniqueOrThrow({
          where: {
            id: Number(resourceId)
          }
        })

        if (profile.user_id === userId) hasAccess = true;
        break;
    
      default:
        break;
    }

    if (req.user.role === 'admin') hasAccess = true;

    if (!hasAccess) throw { name: 'Unauthorized', message: 'You are not authorized' }

    next();
  } catch (error) {
    next(error);
  }
}

export const adminAuthorization = (role) => {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: req.user.id
        },
        include: {
          role: true
        }
      })

      if (user.role.name !== role) throw { name: 'Unauthorized', message: 'You are not authorized' }

      next();
    } catch (error) {
      next(error);
    }
  }
}