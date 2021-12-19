import { Router } from 'express';
import * as userService from './user.service';

const router: Router = Router();

router.post('/users', userService.create);
router.get('/users', userService.getAll);
router.get('/users/:userID', userService.getById);
router.put('/users/:userID', userService.findByIdAndUpdate);
router.delete('/users/:userID', userService.findByIdAndDelete);

export default router;
