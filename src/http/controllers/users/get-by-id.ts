/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { GetUserByIdUseCase } from '../../../use-cases/users/get-user-by-id'

export class GetUserByIdController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    const userId = req.params.id
    try {
      const user = await getUserByIdUseCase.execute(userId)

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
