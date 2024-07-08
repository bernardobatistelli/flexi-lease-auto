/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { UpdateUserUseCase } from '../../../use-cases/users/update-user'

export class UpdateUserController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()

    const updateUserUseCase = new UpdateUserUseCase(usersRepository)

    const updateUserSchema = z.object({
      name: z.string(),
      cpf: z.string(),
      birth: z.string(),
      email: z.string(),
      password: z.string(),
      cep: z.string(),
      qualified: z.coerce.boolean(),
      complement: z.string(),
      locality: z.string(),
      neighborhood: z.string(),
      patio: z.string(),
      uf: z.string(),
    })
    try {
      const {
        name,
        birth,
        email,
        password,
        cep,
        cpf,
        qualified,
        complement,
        locality,
        neighborhood,
        patio,
        uf,
      } = updateUserSchema.parse(req.body)

      const id = req.params.id

      const user = await updateUserUseCase.execute({
        birth,
        id,
        cep,
        cpf,
        qualified,
        email,
        name,
        password,
        complement,
        locality,
        neighborhood,
        patio,
        uf,
      })

      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
