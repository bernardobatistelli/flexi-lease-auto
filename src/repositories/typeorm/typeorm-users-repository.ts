import { Repository } from 'typeorm'
import { CreateUserDTO } from '../../@types/DTOs/users/create-user-dto'
import { UpdateUserDTO } from '../../@types/DTOs/users/update-user-dto'
import { IUser } from '../../@types/interfaces/user-interface'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user'
import { UsersRepository } from '../users-repository'
import { ObjectId } from 'mongodb'

export class TypeOrmUsersRepository implements UsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async findAll(): Promise<IUser[] | null> {
    const users = await this.ormRepository.find()
    if (!users) {
      return null
    }
    return users.map((user) => user as unknown as IUser)
  }

  public async findById(id: string): Promise<IUser | null> {
    const car = await this.ormRepository.findOneBy({
      _id: new ObjectId(id),
    })

    return (car as unknown as IUser) || null
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(data)
    await this.ormRepository.save(user)
    return user as unknown as IUser
  }

  async update(data: UpdateUserDTO): Promise<IUser | null> {
    const actualUser = await this.ormRepository.findOne({
      where: {
        _id: new ObjectId(data.id),
      },
    })

    if (!actualUser) {
      return null
    }

    const updatedUser = await this.ormRepository.save({
      ...actualUser,
      ...data,
    })

    return { ...updatedUser, _id: updatedUser._id.toString() } as IUser
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ _id: new ObjectId(id) })
  }

  async save(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user as unknown as User) as unknown as IUser
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ email })
    if (!user) {
      return null
    }
    return user as unknown as IUser
  }

  async findByCpf(cpf: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ cpf })
    if (!user) {
      return null
    }
    return user as unknown as IUser
  }
}
