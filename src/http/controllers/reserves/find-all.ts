/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { GetAllReservesUseCase } from '../../../use-cases/reserves/get-all-reserves'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'

const reservePaginationParmsSchema = z.object({
  id_reserve: z.string().optional(),
  id_user: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  id_car: z.string().optional(),
  final_value: z.string().optional(),
  perPage: z.number().optional(),
  page: z.number().optional(),
})

export class ListReservesController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()

    const listReserveUseCase = new GetAllReservesUseCase(reservesRepository)

    try {
      const {
        end_date,
        final_value,
        id_reserve,
        id_user,
        start_date,
        page,
        perPage,
      } = reservePaginationParmsSchema.parse(req.query)

      const reserves = await listReserveUseCase.execute({
        end_date,
        final_value,
        id_reserve,
        id_user,
        start_date,
        page,
        perPage,
      })

      return res.status(200).json(reserves)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
