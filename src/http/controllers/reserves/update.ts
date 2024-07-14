/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { UpdateReserveUseCase } from '../../../use-cases/reserves/update-reserve'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'

export class UpdateReserveController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()

    const updateReserveUseCase = new UpdateReserveUseCase(reservesRepository)

    const updateReserveSchema = z.object({
      start_date: z.string({
        invalid_type_error:
          'O campo start_date deve ser uma string em formato de data, ex: 25/04/2005',
      }),
      end_date: z.string({
        invalid_type_error:
          'O campo end_date deve ser uma string em formato de data, ex: 25/04/2005',
      }),
      final_value: z.string({
        invalid_type_error: 'O campo final_value deve ser uma string',
      }),
      id_car: z.string({
        invalid_type_error: 'O campo id_car deve ser uma string',
      }),
      id_user: z.string({
        invalid_type_error: 'O campo id_user deve ser uma string',
      }),
    })
    try {
      const { end_date, final_value, start_date, id_car, id_user } =
        updateReserveSchema.parse(req.body)

      const id = req.params.id

      const reserve = await updateReserveUseCase.execute({
        end_date,
        final_value,
        start_date,
        id,
        id_car,
        id_user,
      })

      return res.status(201).json(reserve)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
