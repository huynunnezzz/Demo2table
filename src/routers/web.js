const express = require("express");
const router = express.Router();

const AdminController = require('../apps/controllers/admin');
const AuthController = require('../apps/controllers/auth');
const ProductController = require('../apps/controllers/product');
const CategoryController = require('../apps/controllers/category');
const UserController = require('../apps/controllers/user');

const AuthMiddleware = require('../apps/middlewares/auth');
const UploadMiddleware = require('../apps/middlewares/upload');


router.get('/admin/login',AuthMiddleware.checkLogin,AuthController.getLogin);
router.post('/admin/login',AuthController.postLogin);

router.get('/admin/regester',AuthController.getRegester);
router.post('/admin/regester',AuthController.postRegester);

//out tai khoan
router.get('/admin/logout',AuthMiddleware.checkAdmin,AuthController.getLogout);

// dashboard
router.get('/admin/dashboard',AuthMiddleware.checkAdmin,AdminController.dashboard);

//User
router.get('/admin/users',AuthMiddleware.checkAdmin,UserController.getUser);
router.get('/admin/users/create',AuthMiddleware.checkAdmin,UserController.getcreateUser);
router.post('/admin/users/create',AuthMiddleware.checkAdmin,UserController.postcreateUser);
router.get('/admin/users/edit/:id',AuthMiddleware.checkAdmin,UserController.geteditUSer);
router.post('/admin/users/edit/:id',AuthMiddleware.checkAdmin,UserController.posteditUSer);
router.get('/admin/users/del/:id',AuthMiddleware.checkAdmin,UserController.delUser);



//product
router.get('/admin/products',AuthMiddleware.checkAdmin,ProductController.getProduct);
router.get('/admin/products/create',AuthMiddleware.checkAdmin,ProductController.createProduct);
router.post('/admin/products/store',UploadMiddleware.single("thumbnail"),AuthMiddleware.checkAdmin,ProductController.store);
router.get('/admin/products/edit/:id',AuthMiddleware.checkAdmin,ProductController.editProduct);
router.post('/admin/products/updateProduct/:id',UploadMiddleware.single("thumbnail"),AuthMiddleware.checkAdmin,ProductController.updateProduct);
router.get('/admin/products/del/:id',AuthMiddleware.checkAdmin,ProductController.delProduct);

//category
router.get('/admin/categories',AuthMiddleware.checkAdmin,CategoryController.getCategory);
router.get('/admin/categories/create',AuthMiddleware.checkAdmin,CategoryController.createCategory);
router.post('/admin/categories/addCategory',AuthMiddleware.checkAdmin,CategoryController.addCategory);
router.get('/admin/categories/edit/:id',AuthMiddleware.checkAdmin,CategoryController.editCagory);
router.post('/admin/categories/updateCategory/:id',AuthMiddleware.checkAdmin,CategoryController.updateCategory);
router.get('/admin/categories/del/:id',AuthMiddleware.checkAdmin,CategoryController.delCategory);


module.exports = router;
