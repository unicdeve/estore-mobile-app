import { Router } from 'express';

import { create, getUserInfo } from './customer.controller';
import { customerAuth } from './customer';


const router = Router();

router.post('/', create);
router.get('/me', customerAuth, getUserInfo)

export default router;