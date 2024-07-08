import { Router } from 'express'
import { CreateUserController } from './create'
import { AuthenticateUserController } from './login'

const UserRouter = Router({
  mergeParams: true,
})
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

// router.get('/', carController.listCars)
// router.get('/:id', carController.searchCar)
UserRouter.post('/', createUserController.execute)
UserRouter.post('/login', authenticateUserController.execute)
// router.put('/:id', carController.updateCar)
// router.delete('/:id', carController.deleteCar)
// router.use('/:car_id/sessions', sessionRoutes)
export default UserRouter
