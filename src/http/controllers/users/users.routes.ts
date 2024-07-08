import { Router } from 'express'
import { CreateUserController } from './create'
import { AuthenticateUserController } from './login'
import { GetAllUsersController } from './list'
import { GetUserByIdController } from './get-by-id'
import { UpdateUserController } from './update'
import { DeleteUserController } from './delete'

const UserRouter = Router({
  mergeParams: true,
})
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getAllUsersController = new GetAllUsersController()
const getUserByIdController = new GetUserByIdController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

UserRouter.get('/:id', getUserByIdController.execute)
UserRouter.get('/', getAllUsersController.execute)
UserRouter.post('/', createUserController.execute)
UserRouter.post('/login', authenticateUserController.execute)
UserRouter.put('/:id', updateUserController.execute)
UserRouter.delete('/:id', deleteUserController.execute)
export default UserRouter
