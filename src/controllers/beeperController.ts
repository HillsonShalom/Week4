import exp, { Request, Response, Router } from 'express'

const router = exp.Router();

router.post('/')
router.get('/')
router.get('/:id')
router.put('/:id/status')
router.delete('/:id')
router.get('/status/:status')

export default router;