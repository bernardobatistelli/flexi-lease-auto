import { CreateUserDTO } from '../@types/DTOs/users/create-user-dto'
import { UpdateUserDTO } from '../@types/DTOs/users/update-user-dto'
import { IUser } from '../@types/interfaces/user-interface'

export interface UsersRepository {
  findAll: () => Promise<IUser[] | null>
  findById: (id: string) => Promise<IUser | null>
  findByEmail: (email: string) => Promise<IUser | null>
  findByCpf: (cpf: string) => Promise<IUser | null>
  create: (data: CreateUserDTO) => Promise<IUser>
  update: (id: string, data: UpdateUserDTO) => Promise<IUser>
  delete: (id: string) => Promise<void>
  save: (user: IUser) => Promise<IUser>
}