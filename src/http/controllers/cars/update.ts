/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { UpdateCarUseCase } from '../../../use-cases/cars/update-car'

export class UpdateCarController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const updateCarUseCase = new UpdateCarUseCase(carsRepository)

    const updateCarSchema = z.object({
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
      } = updateCarSchema.parse(req.body)

      const accessoriesParsed = accessories
        .map(({ description }) => {
          if (description !== undefined) {
            return description
          } else return null
        })
        .filter(Boolean)

      const id = req.params.id

      const car = await updateCarUseCase.execute({
        model,
        id,
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
