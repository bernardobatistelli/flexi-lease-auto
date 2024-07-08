import { CreateUserDTO } from '../../@types/DTOs/users/create-user-dto'
import { UsersRepository } from '../../repositories/users-repository'
import { isValidAge } from '../../utils/is-valid-age'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(data: CreateUserDTO) {
    const userWithSameEmail = await this.userRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const userWithSameCpf = await this.userRepository.findByCpf(data.cpf)

    if (userWithSameCpf) {
      throw new UserAlreadyExistsError()
    }

    isValidAge(data.birth)

    await this.userRepository.create(data)
  }
}