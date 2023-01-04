import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import signup from '../../middleware/validation.middleware';
const routes = Router();
routes.route('/').get(controllers.getMany).post(signup, controllers.create);
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(signup, controllers.updateOne)
  .delete(controllers.deleteOne);
export default routes;
