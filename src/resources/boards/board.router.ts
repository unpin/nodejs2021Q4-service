import { Router } from 'express';
import * as boardService from './board.service';
import { isAuthorized } from '../../middleware/isAuthorized';

const router: Router = Router();

router.post('/boards', isAuthorized, boardService.create);
router.get('/boards', isAuthorized, boardService.getAll);
router.get('/boards/:boardID', isAuthorized, boardService.getOne);
router.put('/boards/:boardID', isAuthorized, boardService.findByIdAndUpdate);
router.delete('/boards/:boardID', isAuthorized, boardService.findByIdAndDelete);

export default router;
