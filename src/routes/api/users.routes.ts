import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import signup from '../../middleware/validation.middleware';
const routes = Router();
routes.post('/', signup, controllers.create);
export default routes;
