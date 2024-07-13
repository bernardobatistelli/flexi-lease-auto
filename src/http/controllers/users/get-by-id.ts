/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { GetUserByIdUseCase } from '../../../use-cases/users/get-user-by-id'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'

export class GetUserByIdController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    const userId = req.params.id
    try {
      const user = await getUserByIdUseCase.execute(userId)

      return res.status(200).json(user)
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
