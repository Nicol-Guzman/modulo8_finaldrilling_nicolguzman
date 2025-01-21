import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { checkDuplicateEmail } from '../middleware/verifySignup.js';

const router = Router();

router.post('/signup', checkDuplicateEmail, userController.signup);
router.post('/signin', userController.signin);
router.get('/:id', verifyToken, userController.findUserById);
router.get('/', verifyToken, userController.findAll);
router.put('/:id', verifyToken, userController.updateUserById);
router.delete('/:id', verifyToken, userController.deleteUserById);

export default router;
