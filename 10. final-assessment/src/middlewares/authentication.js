import { PrismaClient } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';

const prisma = new PrismaClient();

export const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: 'Unauthenticated', message: 'Access Token is required' };

    const payload = jsonwebtoken.verify(access_token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id
      },
      include: {
        role: true
      }
    })

    if (!user) throw { name: 'Unauthenticated', message: 'User is no longer exists' };
    
    req.user = {
      id: user.id,
      role: user.role.name
    }
    
    next();
  } catch (error) {
    next(error);
  }
}