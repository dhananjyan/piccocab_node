
import { Router } from 'express';

import Login from '../controller/Login';

const router = Router();

router.post('/', Login)

export default router;