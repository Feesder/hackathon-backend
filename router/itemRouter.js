import Router from 'express';
import itemController from '../controller/itemController.js'

const router = new Router();

router.post('/items', itemController.create)
router.get('/items', itemController.getAll)
router.get('/items/:tenderId', itemController.getByTenderId)
router.get('/items/:id', itemController.getById)
router.put('/items/:id', itemController.update)
router.delete('/items/:id', itemController.delete)

export default router;