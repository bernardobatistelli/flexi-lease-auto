import { describe, expect, it, vi } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { UsersRepository } from '../../repositories/users-repository'
import { AuthenticateDTO } from '../../@types/DTOs/users/authenticate-dto'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

const mockUsersRepository = {
  findByEmail: vi.fn(),
}

describe('Authenticate', () => {
  it('should successfully authenticate an user', async () => {
    const authenticateUseCase = new AuthenticateUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const user = {
      email: 'test@example.com',
      password: 'securepassword',
      name: 'Test User',
      cpf: '12345678901',
      birth: '2000-01-01',
      cep: '12345-678',
      qualified: true,
      patio: 'Patio 1',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      locality: 'Cidade X',
      uf: 'UF',
    }

    mockUsersRepository.findByEmail.mockResolvedValue(user)

    const authData: AuthenticateDTO = {
      email: 'test@example.com',
      password: 'securepassword',
    }

    await expect(authenticateUseCase.execute(authData)).resolves.toEqual(user)
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(authData.email)
  })

  it('should throw an error if email is not found', async () => {
    const authenticateUseCase = new AuthenticateUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    mockUsersRepository.findByEmail.mockResolvedValue(null)

    const authData: AuthenticateDTO = {
      email: 'test@example.com',
      password: 'securepassword',
    }

    await expect(authenticateUseCase.execute(authData)).rejects.toThrow(
      ResourceNotFoundError,
    )
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(authData.email)
  })

  it('should throw an error if password is invalid', async () => {
    const authenticateUseCase = new AuthenticateUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const user = {
      email: 'test@example.com',
      password: 'securepassword',
      name: 'Test User',
      cpf: '12345678901',
      birth: '2000-01-01',
      cep: '12345-678',
      qualified: true,
      patio: 'Patio 1',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      locality: 'Cidade X',
      uf: 'UF',
    }

    mockUsersRepository.findByEmail.mockResolvedValue(user)

    const authData: AuthenticateDTO = {
      email: 'test@example.com',
      password: 'wrongpassword',
    }

    await expect(authenticateUseCase.execute(authData)).rejects.toThrow(
      InvalidCredentialsError,
    )
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(authData.email)
  })
})
