/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { GetAllCarsUseCase } from '../../../use-cases/cars/get-all-cars'

const carPaginationParmsSchema = z.object({
  color: z.string().optional(),
  model: z.string().optional(),
  number_of_passengers: z.number().optional(),
  value_per_day: z.number().optional(),
  year: z.string().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
})

export class ListCarsController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const listCarUseCase = new GetAllCarsUseCase(carsRepository)

    try {
      const {
        color,
        model,
        number_of_passengers,
        page,
        perPage,
        value_per_day,
        year,
      } = carPaginationParmsSchema.parse(req.query)

      const cars = await listCarUseCase.execute({
        color,
        model,
        number_of_passengers,
        page,
        perPage,
        value_per_day,
        year,
      })

      return res.status(200).json(cars)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
