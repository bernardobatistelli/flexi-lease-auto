/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { UpdateUserUseCase } from '../../../use-cases/users/update-user'

export class UpdateUserController {
  async execute(req: Request, res: Response) {
    const usersRepository = new TypeOrmUsersRepository()

    const updateUserUseCase = new UpdateUserUseCase(usersRepository)

    const updateUserSchema = z.object({
      name: z.string({
        invalid_type_error: 'O campo name deve ser uma string',
      }),
      cpf: z.string({
        invalid_type_error: 'O campo cpf deve ser uma string',
      }),
      birth: z.string({
        invalid_type_error: 'O campo birth deve ser uma string',
      }),
      email: z.string({
        invalid_type_error: 'O campo email deve ser uma string',
      }),
      password: z
        .string({
          invalid_type_error: 'O campo password deve ser uma string',
        })
        .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
      cep: z
        .string({
          invalid_type_error: 'O campo cep deve ser uma string',
        })
        .max(9, { message: 'O campo cep deve ter no máximo 9 caracteres' }),
      qualified: z.coerce.boolean(),
      complement: z.string({
        invalid_type_error: 'O campo complement deve ser uma string',
      }),
      locality: z.string({
        invalid_type_error: 'O campo locality deve ser uma string',
      }),
      neighborhood: z.string({
        invalid_type_error: 'O campo neighborhood deve ser uma string',
      }),
      patio: z.string({
        invalid_type_error: 'O campo patio deve ser uma string',
      }),
      uf: z
        .string({
          invalid_type_error: 'O campo uf deve ser uma string',
        })
        .length(2, { message: 'O campo uf deve ter 2 caracteres' }),
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

      const _id = req.params.id

      const user = await updateUserUseCase.execute({
        birth,
        _id,
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
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
