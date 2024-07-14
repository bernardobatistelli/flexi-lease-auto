/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { CreateCarUseCase } from '../../../use-cases/cars/create-car'

export class CreateCarController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const createCarUseCase = new CreateCarUseCase(carsRepository)

    const createCarSchema = z.object({
      model: z.string({
        required_error: 'O campo model é obrigatório',
        invalid_type_error: 'O campo model deve ser uma string',
      }),
      color: z.string({
        required_error: 'O campo color é obrigatório',
        invalid_type_error: 'O campo color deve ser uma string',
      }),
      year: z
        .string({
          required_error: 'O campo year é obrigatório',
          invalid_type_error: 'O campo year deve ser uma string',
        })
        .length(4, { message: 'O campo year deve ter 4 caracteres' }),
      value_per_day: z.coerce.number({
        required_error: 'O campo value_per_day é obrigatório',
        invalid_type_error: 'O campo value_per_day deve ser um número',
      }),
      accessories: z
        .array(
          z.object({
            description: z.string({
              invalid_type_error: 'O campo description deve ser uma string',
              required_error: 'Pelo menos um acessório é obrigatório',
            }),
          }),
          {
            required_error: 'Pelo menos um acessório é obrigatório',
          },
        )
        .nonempty({
          message: 'Pelo menos um acessório é obrigatório',
        }),
      number_of_passengers: z.number({
        required_error: 'O campo number_of_passengers é obrigatório',
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
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
