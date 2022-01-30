import { Router } from 'express';
import * as userService from './user.service';
import { isAuthorized } from '../../middleware/isAuthorized';

const router: Router = Router();

router.post('/users', isAuthorized, userService.create);
router.get('/users', isAuthorized, userService.getAll);
router.get('/users/:userID', isAuthorized, userService.getById);
router.put('/users/:userID', isAuthorized, userService.findByIdAndUpdate);
router.delete('/users/:userID', isAuthorized, userService.findByIdAndDelete);

export default router;
