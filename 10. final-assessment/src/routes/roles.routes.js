import express from 'express';
import { roleController } from '../controllers/roles.controller.js';
import { adminAuthorization } from '../middlewares/authorizations.js';
import { authentication } from '../middlewares/authentication.js';
const roleRouter = express.Router();

roleRouter.post('/', authentication, adminAuthorization('admin'), roleController.addRole);
roleRouter.get('/', authentication, adminAuthorization('admin'), roleController.getRoles);
roleRouter.get('/:id', authentication, adminAuthorization('admin'), roleController.findRole);
roleRouter.put('/:id', authentication, adminAuthorization('admin'), roleController.updateRole);
roleRouter.delete('/:id', authentication, adminAuthorization('admin'), roleController.deleteRole);

export default roleRouter;