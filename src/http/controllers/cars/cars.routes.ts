import { Router } from 'express'
import { CreateCarController } from './create'
import { DeleteCarController } from './delete'
import { GetCarByIdController } from './get-by-id'
import { ListCarsController } from './list'
import { UpdateCarController } from './update'
import { verifyToken } from '../../middlewares/auth-middleware'
import { UpdateAccessoryController } from './update-accessory'

const CarRouter = Router({
  mergeParams: true,
})
const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const deleteCarController = new DeleteCarController()
const getCarByIdController = new GetCarByIdController()
const updateCarController = new UpdateCarController()
const updateAccessoryController = new UpdateAccessoryController()

CarRouter.get('/', verifyToken, listCarsController.execute)
CarRouter.get('/:id', verifyToken, getCarByIdController.execute)
CarRouter.post('/', verifyToken, createCarController.execute)
CarRouter.put('/:id', verifyToken, updateCarController.execute)
CarRouter.delete('/:id', verifyToken, deleteCarController.execute)
CarRouter.patch(
  '/:carId/accessories/:accessoryIndex',
  verifyToken,
  updateAccessoryController.execute,
)

export default CarRouter
