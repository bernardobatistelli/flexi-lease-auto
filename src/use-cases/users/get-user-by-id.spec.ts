import { beforeEach, describe, expect, it, vi } from 'vitest'
import { IUser } from '../../@types/interfaces/user-interface'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { GetUserByIdUseCase } from './get-user-by-id'

const mockUsersRepository = {
  findById: vi.fn(),
}

describe('Get user by id', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully get an user by its id', async () => {
    const getUserByIdUseCase = new GetUserByIdUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const userId = '1234567890'
    const user: IUser = {
      id: userId,
      name: 'User One',
      email: 'userone@example.com',
      password: 'password1',
      cpf: '12345678901',
      cep: '12345678',
      qualified: true,
      patio: 'Rua ABC',
      complement: 'Apt 101',
      neighborhood: 'Bairro XYZ',
      locality: 'Cidade ABC',
      uf: 'UF',
    }

    mockUsersRepository.findById.mockResolvedValue(user)

    const result = await getUserByIdUseCase.execute(userId)

    expect(result).toEqual(user)
    expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId)
  })

  it('should throw an error if user was not found', async () => {
    const getUserByIdUseCase = new GetUserByIdUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const userId = 'nonexistent_id'
    mockUsersRepository.findById.mockResolvedValue(null)

    await expect(getUserByIdUseCase.execute(userId)).rejects.toThrow(
      ResourceNotFoundError,
    )
    expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId)
  })
})
