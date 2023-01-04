import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import signup from '../../middleware/validation.middleware';
import authenticationMiddleware from '../../middleware/authentication.middleware';
const routes = Router();
routes
  .route('/')
  .get(authenticationMiddleware, controllers.getMany)
  .post(signup, controllers.create);
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(signup, controllers.updateOne)
  .delete(controllers.deleteOne);

//authentication
routes.route('/authenticate').post(signup, controllers.authenticate);
export default routes;
