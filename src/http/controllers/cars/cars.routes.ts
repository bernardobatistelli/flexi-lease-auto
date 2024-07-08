import { Router } from 'express'
import { CreateCarController } from './create'
import { DeleteCarController } from './delete'
import { GetCarByIdController } from './get-by-id'
import { ListCarsController } from './list'
import { UpdateCarController } from './update'

const CarRouter = Router({
  mergeParams: true,
})
const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const deleteCarController = new DeleteCarController()
const getCarByIdController = new GetCarByIdController()
const updateCarController = new UpdateCarController()

CarRouter.get('/', listCarsController.execute)
CarRouter.get('/:id', getCarByIdController.execute)
CarRouter.post('/', createCarController.execute)
CarRouter.put('/:id', updateCarController.execute)
CarRouter.delete('/:id', deleteCarController.execute)

export default CarRouter
