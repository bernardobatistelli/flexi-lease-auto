import { Router } from 'express'
import CarRouter from './cars/cars.routes'

const routes = Router({
  mergeParams: true,
})

routes.use('/car', CarRouter)

export default routes
