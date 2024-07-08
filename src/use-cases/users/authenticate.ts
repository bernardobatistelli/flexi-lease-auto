/* eslint-disable no-useless-constructor */
import { AuthenticateDTO } from '../../@types/DTOs/users/authenticate-dto'
import { UsersRepository } from '../../repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: AuthenticateDTO) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (user.password !== data.password) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}
