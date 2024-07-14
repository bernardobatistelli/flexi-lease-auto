import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { CreateUserUseCase } from '../../../use-cases/users/create-user'
import { UnderageError } from '../../../use-cases/errors/underage'

export class CreateUserController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const createUserSchema = z.object({
      name: z.string({
        invalid_type_error: 'O campo name deve ser uma string',
        required_error: 'O campo name é obrigatório',
      }),
      cpf: z.string({
        invalid_type_error: 'O campo cpf deve ser uma string',
        required_error: 'O campo cpf é obrigatório',
      }),
      birth: z.string({
        invalid_type_error: 'O campo birth deve ser uma string',
        required_error: 'O campo birth é obrigatório',
      }),
      email: z.string({
        invalid_type_error: 'O campo email deve ser uma string',
        required_error: 'O campo email é obrigatório',
      }),
      password: z.string({
        invalid_type_error: 'O campo password deve ser uma string',
        required_error: 'O campo password é obrigatório',
      }),
      cep: z.string({
        invalid_type_error: 'O campo cep deve ser uma string',
        required_error: 'O campo cep é obrigatório',
      }),
      qualified: z.coerce.boolean({
        required_error: 'O campo qualified é obrigatório',
      }),
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

      const parsedData = cepResponseSchema.parse(data)

      const location: locationDetails = {
        complement: parsedData.complemento ? parsedData.complemento : 'N/A',
        locality: parsedData.localidade ? parsedData.localidade : 'N/A',
        uf: parsedData.uf ? parsedData.uf : 'N/A',
        neighborhood: parsedData.bairro ? parsedData.bairro : 'N/A',
        patio: parsedData.logradouro ? parsedData.logradouro : 'N/A',
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

      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      if (error instanceof UnderageError) {
        return res.status(400).json({ error: error.name })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
