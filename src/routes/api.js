const express = require('express');
const router = express.Router();

const UserController = require("../controller/MyUserController");
const ProductController = require("../controller/MyProductController");
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/registration", UserController.UserRegistration);
router.get("/otp-verify/:email/:otp", UserController.UserEmailVerify);
router.post("/login", UserController.login);
router.get('/logout', AuthVerifyMiddleware, UserController.logout)
router.get('/profile', AuthVerifyMiddleware, UserController.ReadProfile)

router.post('/changeImage', AuthVerifyMiddleware, upload.single('profileImage'), UserController.changeImage)

router.post('/create-product', AuthVerifyMiddleware, upload.single('image'), ProductController.CreateProduct)
router.post('/update-product/:productId', AuthVerifyMiddleware, upload.single('image'), ProductController.updateProduct)

router.get('/All-product',  ProductController.AllProduct)
router.get('/ReadProductById/:productId', AuthVerifyMiddleware,  ProductController.ReadProductById)
router.get('/userallProduct', AuthVerifyMiddleware,  ProductController.UserAllProduct)
router.get('/deleteProductByUser/:productId', AuthVerifyMiddleware,  ProductController.deleteProductByUser)
// Search Product Route
router.get('/product-by-keyword/:keyword', AuthVerifyMiddleware, ProductController.ProductByKeyword)
router.post('/ProductByBrandAndCategory', AuthVerifyMiddleware, ProductController.ProductByBrandAndCategory)

module.exports = router;