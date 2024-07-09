/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { DeleteReserveUseCase } from '../../../use-cases/reserves/delete-reserve'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'

export class DeleteReserveController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()

    const deleteReserveUseCase = new DeleteReserveUseCase(reservesRepository)

    const reserveId = req.params.id
    try {
      await deleteReserveUseCase.execute(reserveId)

      return res.status(201).json()
    } catch (error) {
      switch (error.message) {
        case 'Resource not found':
          return res.status(404).json({})
        default:
          return res.status(400).json({ error: error.message })
      }
    }
  }
}
