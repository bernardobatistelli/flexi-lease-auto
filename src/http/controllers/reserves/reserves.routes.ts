import { Router } from 'express'
import { verifyToken } from '../../middlewares/auth-middleware'
import { CreateReserveController } from './create'

const ReserveRouter = Router({
  mergeParams: true,
})
const createReserveController = new CreateReserveController()

// ReserveRouter.get('/', listCarsController.execute)
// ReserveRouter.get('/:id', getCarByIdController.execute)
ReserveRouter.post('/', verifyToken, createReserveController.execute)
// ReserveRouter.put('/:id', updateCarController.execute)
// ReserveRouter.delete('/:id', deleteCarController.execute)

export default ReserveRouter
