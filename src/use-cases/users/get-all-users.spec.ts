import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetAllUsersUseCase } from './get-all-users'
import { UsersRepository } from '../../repositories/users-repository'
import { IUser } from '../../@types/interfaces/user-interface'

const mockUsersRepository = {
  findAll: vi.fn(),
}

describe('Get all users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be able to display a list of users', async () => {
    const getAllUsersUseCase = new GetAllUsersUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const users: IUser[] = [
      {
        id: '1',
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
      },
      {
        id: '2',
        name: 'User Two',
        email: 'usertwo@example.com',
        password: 'password2',
        cpf: '12345678902',
        cep: '12345679',
        qualified: false,
        patio: 'Rua DEF',
        complement: 'Apt 102',
        neighborhood: 'Bairro UVW',
        locality: 'Cidade DEF',
        uf: 'DF',
      },
    ]

    mockUsersRepository.findAll.mockResolvedValue(users)

    const result = await getAllUsersUseCase.execute()

    expect(result).toEqual(users)
    expect(mockUsersRepository.findAll).toHaveBeenCalled()
  })

  it('should throw an error if finding all users fails', async () => {
    const getAllUsersUseCase = new GetAllUsersUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    mockUsersRepository.findAll.mockRejectedValue(
      new Error('Find all users failed'),
    )

    await expect(getAllUsersUseCase.execute()).rejects.toThrow(
      'Find all users failed',
    )
    expect(mockUsersRepository.findAll).toHaveBeenCalled()
  })
})
