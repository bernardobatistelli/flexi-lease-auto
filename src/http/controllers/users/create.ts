import { Request, Response } from 'express'
import { z } from 'zod'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { CreateUserUseCase } from '../../../use-cases/users/create-user'

export class CreateUserController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const createUserSchema = z.object({
      name: z.string(),
      cpf: z.string(),
      birth: z.string(),
      email: z.string(),
      password: z.string(),
      cep: z.string(),
      qualified: z.coerce.boolean(),
    })

    type locationDetails = {
      patio: string
      complement: string
      neighborhood: string
      locality: string
      uf: string
    }

    const cepResponseSchema = z.object({
      cep: z.string(),
      logradouro: z.string(),
      complemento: z.string(),
      bairro: z.string(),
      localidade: z.string(),
      uf: z.string(),
    })

    try {
      const { birth, cep, cpf, email, name, password, qualified } =
        createUserSchema.parse(req.body)

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)

      const data = await response.json()

      console.log(data)

      const parsedData = cepResponseSchema.parse(data)

      const location: locationDetails = {
        complement: parsedData.complemento,
        locality: parsedData.localidade,
        uf: parsedData.uf,
        neighborhood: parsedData.bairro,
        patio: parsedData.logradouro,
      }

      const user = await createUserUseCase.execute({
        ...location,
        birth,
        cep,
        cpf,
        email,
        name,
        password,
        qualified,
      })

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }
}
