import { Router } from 'express';
import User from './App/models/user';

const router = new Router();

router.get('/teste', async (req, res) => {
    const user = await User.create({
        name: 'Bruno dos Santos',
        email: 'bruno.coelho.santos17@gmail.com',
        password_hash: '11211234',
    });
    return res.json({ user });
});

export default router;
