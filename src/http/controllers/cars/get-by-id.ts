/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { GetCarByIdUseCase } from '../../../use-cases/cars/get-car-by-id'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'

export class GetCarByIdController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const getCarByIdUseCase = new GetCarByIdUseCase(carsRepository)

    const carId = req.params.id
    try {
      const car = await getCarByIdUseCase.execute(carId)

      return res.status(200).json(car)
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
