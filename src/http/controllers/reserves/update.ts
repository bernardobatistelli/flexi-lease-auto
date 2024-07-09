/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { UpdateReserveUseCase } from '../../../use-cases/reserves/update-reserve'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'

export class UpdateReserveController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()

    const updateReserveUseCase = new UpdateReserveUseCase(reservesRepository)

    const updateReserveSchema = z.object({
      start_date: z.string(),
      end_date: z.string(),
      final_value: z.string(),
      id_car: z.string(),
      id_user: z.string(),
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
      return res.status(400).json({ error: error.message })
    }
  }
}
