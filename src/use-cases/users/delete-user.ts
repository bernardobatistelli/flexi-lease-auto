/* eslint-disable no-useless-constructor */
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    await this.userRepository.delete(id)
  }
}
