import { randomUUID } from 'node:crypto'
import { CreateUserDTO } from '../../@types/DTOs/users/create-user-dto'
import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../users-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found'
import { UpdateUserDTO } from '../../@types/DTOs/users/update-user-dto'

export class InMemoryUsersRepository implements UsersRepository {
  private users: IUser[] = []
  async save(user: IUser) {
    const userIndex = this.users.findIndex((item) => item.id === user.id)

    if (userIndex >= 0) {
      this.users[userIndex] = user
    }

    return user
  }

  async findAll(): Promise<IUser[]> {
    return this.users
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      cpf: data.password,
      birth: data.birth,
      cep: data.cep,
      qualified: data.qualified,
      patio: data.patio,
      complement: data.complement,
      neighborhood: data.neighborhood,
      locality: data.locality,
      uf: data.uf,
    }

    this.users.push(user)

    return user
  }

  async update(id: string, data: UpdateUserDTO): Promise<IUser> {
    const user = this.users.find((user) => user.id === id)
    if (!user) throw new ResourceNotFoundError()
    Object.assign(user, data)
    return user
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id)

    if (index === -1) {
      return
    }

    this.users.splice(index, 1)
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async findByCpf(cpf: string): Promise<IUser | null> {
    return this.users.find((user) => user.cpf === cpf) || null
  }
}
