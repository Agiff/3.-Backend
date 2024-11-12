import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProfileController {
  addProfile = async (req, res, next) => {
    try {
      const newProfile = await prisma.profile.create({
        data: {
          ...req.body,
          user_id: req.user.id
        }
      })

      res.status(201).send(newProfile);
    } catch (error) {
      next(error);
    }
  }

  getProfiles = async (req, res, next) => {
    try {
      const profiles = await prisma.profile.findMany();
      res.status(200).send(profiles);
    } catch (error) {
      next(error);
    }
  }

  findProfile = async (req, res, next) => {
    try {
      const profile = await prisma.profile.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(profile);
    } catch (error) {
      next(error);
    }
  }

  updateProfile = async (req, res, next) => {
    try {
      await prisma.profile.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      const updatedProfile = await prisma.profile.update({
        data: req.body,
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(updatedProfile);
    } catch (error) {
      next(error);
    }
  }

  deleteProfile = async (req, res, next) => {
    try {
      await prisma.profile.findUniqueOrThrow({
        where: {
          id: Number(req.params.id)
        }
      })

      const deletedProfiles = await prisma.profile.delete({
        where: {
          id: Number(req.params.id)
        }
      })

      res.status(200).send(deletedProfiles);
    } catch (error) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();