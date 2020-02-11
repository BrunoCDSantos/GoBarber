import { Router } from 'express';

const router = new Router();

router.get('/teste', (req, res)=> {
    return res.json({message: 'y'});
});


export default router;