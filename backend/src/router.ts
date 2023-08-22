import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';

import uploadConfig from './config/multer';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

// User Routers
router.post('/user', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/user/info', isAuthenticated, new DetailUserController().handle);

// Category Routers
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category/list', isAuthenticated, new ListCategoryController().handle);

// Product Routers
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/product/find', isAuthenticated, new ListByCategoryController().handle);

// Order Routers
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/item', isAuthenticated, new AddItemController().handle);
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/order/list', isAuthenticated, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };
