import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UpdateUserUseCase } from './update-user'
import { UsersRepository } from '../../repositories/users-repository'
import { UpdateUserDTO } from '../../@types/DTOs/users/update-user-dto'
import { IUser } from '../../@types/interfaces/user-interface'

const mockUsersRepository = {
  update: vi.fn(),
}

describe('Update user', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully update an user', async () => {
    const updateUseCase = new UpdateUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const userData: UpdateUserDTO = {
      id: '1234567890',
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'newpassword',
      cpf: '12345678901',
      birth: '1990-01-01',
      cep: '12345678',
      qualified: true,
      patio: 'Rua ABC',
      complement: 'Apt 123',
      neighborhood: 'Bairro XYZ',
      locality: 'Cidade ABC',
      uf: 'UF',
    }

    const updatedUser: IUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      cpf: userData.cpf,
      cep: userData.cep,
      qualified: userData.qualified,
      patio: userData.patio,
      complement: userData.complement,
      neighborhood: userData.neighborhood,
      locality: userData.locality,
      uf: userData.uf,
    }

    mockUsersRepository.update.mockResolvedValue(updatedUser)

    const result = await updateUseCase.execute(userData)

    expect(result).toEqual(updatedUser)
    expect(mockUsersRepository.update).toHaveBeenCalledWith(userData)
  })

  it('should throw an error if a error occurs during update', async () => {
    const updateUseCase = new UpdateUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const userData: UpdateUserDTO = {
      id: '1234567890',
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'newpassword',
      cpf: '12345678901',
      birth: '1990-01-01',
      cep: '12345678',
      qualified: true,
      patio: 'Rua ABC',
      complement: 'Apt 123',
      neighborhood: 'Bairro XYZ',
      locality: 'Cidade ABC',
      uf: 'UF',
    }

    mockUsersRepository.update.mockRejectedValue(new Error('Update failed'))

    await expect(updateUseCase.execute(userData)).rejects.toThrow(
      'Update failed',
    )
    expect(mockUsersRepository.update).toHaveBeenCalledWith(userData)
  })
})
