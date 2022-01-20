import { Router } from 'express';
import * as taskService from './task.service';
import { isAuthorized } from '../../middleware/isAuthorized';

const router: Router = Router();

router.post('/boards/:boardID/tasks', isAuthorized, taskService.create);
router.get('/boards/:boardID/tasks', isAuthorized, taskService.getAll);
router.get('/boards/:boardID/tasks/:taskID', isAuthorized, taskService.getOne);
router.put(
  '/boards/:boardID/tasks/:taskID',
  isAuthorized,
  taskService.findByIdAndUpdate
);
router.delete(
  '/boards/:boardID/tasks/:taskID',
  isAuthorized,
  taskService.findByIdAndDelete
);

export default router;
