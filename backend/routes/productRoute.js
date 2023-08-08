import express from 'express';
import {
  getProducts,
  addProducts,
  getSlug,
  getById,
  updateProduct,
  deleteProduct,
  validateSlug,
  updateRating,
} from '../controllers/controllers.js';

const productRouter = express.Router();
import Validatetoken from '../controllers/middleware.js';

productRouter.get('/', getProducts);
productRouter.get('/slug/:slug', getSlug);
productRouter.get('/:id', getById);

productRouter.patch('/:slug', updateRating);

productRouter.use(Validatetoken.validateAdminToken);

productRouter.post('/add', validateSlug, addProducts);
productRouter.put('/update/:id', updateProduct);
productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;
