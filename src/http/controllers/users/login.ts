import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../../../env'
import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { AuthenticateUseCase } from '../../../use-cases/users/authenticate'

export class AuthenticateUserController {
  async execute(request: Request, response: Response) {
    const usersRepository = new TypeOrmUsersRepository()
    const authenticate = new AuthenticateUseCase(usersRepository)
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    try {
      const { email, password } = loginSchema.parse(request.body)

      const user = await authenticate.execute({ email, password })

      if (!user) {
        return response.status(401).json({ error: 'Invalid email or password' })
      }

      const { _id } = user

      console.log(_id)

      const token = jwt.sign({ sub: _id }, env.SECRET_KEY, {
        expiresIn: '12h',
      })

      return response.status(201).json({ token })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
