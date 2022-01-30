import { Router } from 'express';
import * as authService from './auth.service';

const router: Router = Router();

router.post('/login', authService.login);

export default router;
