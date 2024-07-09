import { Router } from 'express'
import CarRouter from './cars/cars.routes'
import UserRouter from './users/users.routes'
import ReserveRouter from './reserves/reserves.routes'

const routes = Router({
  mergeParams: true,
})

routes.use('/car', CarRouter)
routes.use('/user', UserRouter)
routes.use('/reserve', ReserveRouter)

export default routes
