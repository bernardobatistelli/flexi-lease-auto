import { Repository } from 'typeorm'
import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../users-repository'
import { User } from '../../entities/user'
import { AppDataSource } from '../../data-source'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found'
import { CreateUserDTO } from '../../@types/DTOs/users/create-user-dto'
import { UpdateUserDTO } from '../../@types/DTOs/users/update-user-dto'

export class TypeOrmUsersRepository implements UsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async findAll(): Promise<IUser[] | null> {
    const users = await this.ormRepository.find()
    if (!users) {
      throw new ResourceNotFoundError()
    }
    return users
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ id })
    if (!user) {
      throw new ResourceNotFoundError()
    }
    return user
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(data)
    await this.ormRepository.save(user)
    return user
  }

  async update(id: string, data: UpdateUserDTO): Promise<IUser> {
    const user = await this.ormRepository.save(data)

    return user
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  async save(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user)
  }
}
