/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { GetReserveByIdUseCase } from '../../../use-cases/reserves/get-reserve-by-id'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'

export class GetReserveByIdController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()

    const getReserveByIdUseCase = new GetReserveByIdUseCase(reservesRepository)

    const reserveId = req.params.id
    try {
      const reserve = await getReserveByIdUseCase.execute(reserveId)

      return res.status(200).json(reserve)
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
