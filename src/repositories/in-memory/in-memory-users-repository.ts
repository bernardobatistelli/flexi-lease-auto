import { randomUUID } from 'node:crypto'

import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../users-repository'
import { CreateUserDTO } from '../../@types/DTOs/users/create-user-dto'
import { UpdateUserDTO } from '../../@types/DTOs/users/update-user-dto'

export class InMemoryUsersRepository implements UsersRepository {
  private users: IUser[] = []
  async save(user: IUser) {
    const userIndex = this.users.findIndex((item) => item._id === user._id)

    if (userIndex >= 0) {
      this.users[userIndex] = user
    }

    return user
  }

  async findAll(): Promise<IUser[]> {
    return this.users
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user._id === id) || null
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    const user = {
      _id: randomUUID(),
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

  async update(data: UpdateUserDTO): Promise<IUser> {
    const index = this.users.findIndex((user) => user._id === data._id)

    if (index === -1) {
      return data
    }

    this.users[index] = data
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user._id === id)

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
