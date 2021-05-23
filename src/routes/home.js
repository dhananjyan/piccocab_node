import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.render('index', { books: "afddsf" })
})

export default router;