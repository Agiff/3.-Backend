import express from 'express';
import { profileController } from '../controllers/profiles.controller.js';
const profileRouter = express.Router();

profileRouter.post('/', profileController.addProfile);
profileRouter.get('/', profileController.getProfiles);
profileRouter.get('/:id', profileController.findProfile);
profileRouter.put('/:id', profileController.updateProfile);
profileRouter.delete('/:id', profileController.deleteProfile);

export default profileRouter;