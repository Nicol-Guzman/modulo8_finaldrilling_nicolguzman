import { Router } from 'express';
import * as bootcampController from '../controllers/bootcamp.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, bootcampController.createBootcamp);  
router.post('/adduser', verifyToken, bootcampController.addUser);  
router.get('/:id', verifyToken, bootcampController.findById);  
router.get('/', verifyToken, bootcampController.findAll);

export default router;
