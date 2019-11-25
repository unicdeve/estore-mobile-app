import { Router } from 'express';

import { create } from './customer.controller';
import { customerAuth } from './customer';


const router = Router();

router.post('/', create);
router.get('/hello', customerAuth, (req, res) => {
    console.log('User ', req.user)
    res.send('this is for logged in users')
})

export default router;