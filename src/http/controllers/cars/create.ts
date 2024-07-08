/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { CreateCarUseCase } from '../../../use-cases/cars/create-car'

export class CreateCarController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const createCarUseCase = new CreateCarUseCase(carsRepository)

    const createCarSchema = z.object({
      model: z.string(),
      color: z.string(),
      year: z.string(),
      value_per_day: z.coerce.number(),
      accessories: z.array(
        z.object({
          description: z.string(),
        }),
      ),
      number_of_passengers: z.number(),
    })
    try {
      const {
        accessories,
        color,
        model,
        number_of_passengers,
        value_per_day,
        year,
      } = createCarSchema.parse(req.body)

      const accessoriesParsed = accessories
        .map(({ description }) => {
          if (description !== undefined) {
            return description
          } else return null
        })
        .filter(Boolean)

      const car = await createCarUseCase.execute({
        model,
        color,
        year,
        accessories: accessoriesParsed.map((desc) => {
          return { description: desc }
        }),
        number_of_passengers,
        value_per_day,
      })

      return res.status(201).json(car)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
