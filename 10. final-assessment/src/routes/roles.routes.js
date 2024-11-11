import express from 'express';
import { roleController } from '../controllers/roles.controller.js';
const roleRouter = express.Router();

roleRouter.post('/', roleController.addRole);
roleRouter.get('/', roleController.getRoles);
roleRouter.get('/:id', roleController.findRole);
roleRouter.put('/:id', roleController.updateRole);
roleRouter.delete('/:id', roleController.deleteRole);

export default roleRouter;