import { Router } from 'express'
import { CreateUserController } from './create'

const UserRouter = Router({
  mergeParams: true,
})
const createUserController = new CreateUserController()

// router.get('/', carController.listCars)
// router.get('/:id', carController.searchCar)
UserRouter.post('/', createUserController.execute)
// router.put('/:id', carController.updateCar)
// router.delete('/:id', carController.deleteCar)
// router.use('/:car_id/sessions', sessionRoutes)
export default UserRouter