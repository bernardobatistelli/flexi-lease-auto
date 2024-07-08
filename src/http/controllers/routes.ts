import { Router } from 'express'
import CarRouter from './cars/cars.routes'
import UserRouter from './users/users.routes'

const routes = Router({
  mergeParams: true,
})

routes.use('/car', CarRouter)
routes.use('/user', UserRouter)

export default routes
