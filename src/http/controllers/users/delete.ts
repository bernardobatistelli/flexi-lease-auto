/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { DeleteUserUseCase } from '../../../use-cases/users/delete-user'

export class DeleteUserController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()

    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    const userId = req.params.id
    try {
      await deleteUserUseCase.execute(userId)

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
