import { z } from 'zod'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { CreateUserUseCase } from '../../../use-cases/users/create-user'
import { Request, Response } from 'express'
import axios from 'axios'

export class CreateUserController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const createUserSchema = z.object({
      // name: z.string(),
      // email: z.string(),
      // cpf: z.string(),
      // birth: z.string(),
      // password: z.string(),
      cep: z.string(),
      // qualified: z.boolean(),
      // patio: z.string(),
      // complement: z.string(),
      // neighborhood: z.string(),
      // locality: z.string(),
      // uf: z.string(),
    })

    try {
      const { cep } = createUserSchema.parse(req.body)
      console.log(cep)

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
      const data = await response.json()

      console.log(data)

      return res.status(200).json(data)
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }
  }
}
