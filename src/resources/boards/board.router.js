const router = require('@koa/router')();
const boardService = require('./board.service.js');

router.post('/boards', boardService.create);
router.get('/boards', boardService.getAll);
router.get('/boards/:boardID', boardService.getOne);
router.put('/boards/:boardID', boardService.updateOne);
router.delete('/boards/:boardID', boardService.deleteOne);

module.exports = router;
