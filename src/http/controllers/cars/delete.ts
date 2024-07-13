/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { DeleteCarUseCase } from '../../../use-cases/cars/delete-car'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'

export class DeleteCarController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const deleteCarUseCase = new DeleteCarUseCase(carsRepository)

    const carId = req.params.id
    try {
      await deleteCarUseCase.execute(carId)

      return res.status(201).json()
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
