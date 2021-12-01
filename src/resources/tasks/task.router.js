const router = require('@koa/router')();
const taskService = require('./task.service.js');

router.post('/boards/:boardID/tasks', taskService.create);
router.get('/boards/:boardID/tasks', taskService.getAll);
router.get('/boards/:boardID/tasks/:taskID', taskService.getOne);
router.put('/boards/:boardID/tasks/:taskID', taskService.updateOne);
router.delete('/boards/:boardID/tasks/:taskID', taskService.deleteOne);

module.exports = router;
