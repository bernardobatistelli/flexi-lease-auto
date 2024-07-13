/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { UpdateCarUseCase } from '../../../use-cases/cars/update-car'

export class UpdateCarController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const updateCarUseCase = new UpdateCarUseCase(carsRepository)

    const reqParamsSchema = z.string({
      message: 'Nenhum carro com esse id existe',
    })

    const updateCarSchema = z.object({
      model: z.string({
        invalid_type_error: 'O campo model deve ser uma string',
      }),
      color: z.string({
        invalid_type_error: 'O campo color deve ser uma string',
      }),
      year: z.string({
        invalid_type_error: 'O campo year deve ser uma string',
      }),
      value_per_day: z.coerce.number({
        invalid_type_error: 'O campo value_per_day deve ser um número',
      }),
      accessories: z.array(
        z.object({
          description: z.string({
            invalid_type_error: 'O campo description deve ser uma string',
          }),
        }),
      ),
      number_of_passengers: z.number({
        invalid_type_error: 'O campo number_of_passengers deve ser um número',
      }),
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

      const id = reqParamsSchema.parse(req.params.id)

      const car = await updateCarUseCase.execute({
        id,
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
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
