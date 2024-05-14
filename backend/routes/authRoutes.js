import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login',userAuth, loginController);

export default router;