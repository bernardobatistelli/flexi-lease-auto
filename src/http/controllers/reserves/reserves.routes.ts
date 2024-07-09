import { Router } from 'express'
import { verifyToken } from '../../middlewares/auth-middleware'
import { CreateReserveController } from './create'
import { ListReservesController } from './find-all'
import { GetReserveByIdController } from './get-by-id'
import { DeleteReserveController } from './delete'
import { UpdateReserveController } from './update'

const ReserveRouter = Router({
  mergeParams: true,
})
const createReserveController = new CreateReserveController()
const listReservesController = new ListReservesController()
const getReserveByIdController = new GetReserveByIdController()
const deleteReserveController = new DeleteReserveController()
const updateReserveController = new UpdateReserveController()

ReserveRouter.get('/', listReservesController.execute)
ReserveRouter.get('/:id', getReserveByIdController.execute)
ReserveRouter.post('/', verifyToken, createReserveController.execute)
ReserveRouter.put('/:id', updateReserveController.execute)
ReserveRouter.delete('/:id', deleteReserveController.execute)

export default ReserveRouter
