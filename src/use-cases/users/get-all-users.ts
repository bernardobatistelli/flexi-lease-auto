/* eslint-disable no-useless-constructor */
import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../../repositories/users-repository'

export class GetAllUsersUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<IUser[]> {
    const user = await this.userRepository.findAll()

    return user
  }
}
