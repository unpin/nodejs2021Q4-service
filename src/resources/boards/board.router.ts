import { Router } from 'express';
import * as boardService from './board.service';

const router: Router = Router();

router.post('/boards', boardService.create);
router.get('/boards', boardService.getAll);
router.get('/boards/:boardID', boardService.getOne);
router.put('/boards/:boardID', boardService.findByIdAndUpdate);
router.delete('/boards/:boardID', boardService.findByIdAndDelete);

export default router;
