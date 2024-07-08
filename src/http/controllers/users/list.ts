/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { GetAllUsersUseCase } from '../../../use-cases/users/get-all-users'

export class GetAllUsersController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()

    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)
    try {
      const user = await getAllUsersUseCase.execute()

      return res.status(200).json(user)
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
