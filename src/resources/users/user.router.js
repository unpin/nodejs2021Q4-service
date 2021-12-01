const router = require('@koa/router')();
const userService = require('./user.service.js');

router.post('/users', userService.create);
router.get('/users', userService.getAll);
router.get('/users/:userID', userService.getOne);
router.put('/users/:userID', userService.updateOne);
router.delete('/users/:userID', userService.deleteOne);

module.exports = router;
