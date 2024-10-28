import { verifyAccessToken } from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: 'InvalidToken', message: 'No Access Token' };

    const payload = verifyAccessToken(access_token);
    
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: payload.id
      }
    })
    
    req.user = { id: user.id };
    
    next();
  } catch (error) {
    next(error);
  }
}