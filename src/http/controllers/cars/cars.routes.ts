import { Router } from 'express'
import { CreateCarController } from './create'

const CarRouter = Router({
  mergeParams: true,
})
const createCarController = new CreateCarController()

// router.get('/', carController.listCars)
// router.get('/:id', carController.searchCar)
CarRouter.post('/', createCarController.execute)
// router.put('/:id', carController.updateCar)
// router.delete('/:id', carController.deleteCar)

// router.use('/:car_id/sessions', sessionRoutes)

export default CarRouter
