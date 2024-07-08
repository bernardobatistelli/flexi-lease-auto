/* eslint-disable no-useless-constructor */
import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class GetUserByIdUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
