/* eslint-disable no-useless-constructor */
import { UpdateUserDTO } from '../../@types/DTOs/users/update-user-dto'
import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../../repositories/users-repository'

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: UpdateUserDTO): Promise<IUser> {
    const user = await this.usersRepository.update(data)

    return user
  }
}
