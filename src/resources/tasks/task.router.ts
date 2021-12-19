import { Router } from 'express';
import * as taskService from './task.service';

const router: Router = Router();

router.post('/boards/:boardID/tasks', taskService.create);
router.get('/boards/:boardID/tasks', taskService.getAll);
router.get('/boards/:boardID/tasks/:taskID', taskService.getOne);
router.put('/boards/:boardID/tasks/:taskID', taskService.findByIdAndUpdate);
router.delete('/boards/:boardID/tasks/:taskID', taskService.findByIdAndDelete);

export default router;
