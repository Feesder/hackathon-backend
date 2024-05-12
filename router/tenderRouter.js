import Router from 'express';
import tenderController from '../controller/tenderController.js'

const router = new Router();

router.post('/tenders', tenderController.create)
router.get('/tenders', tenderController.getAll)
router.get('/tenders/:id', tenderController.getById)
router.put('/tenders/:id', tenderController.update)
router.delete('/tenders/:id', tenderController.delete)

export default router;