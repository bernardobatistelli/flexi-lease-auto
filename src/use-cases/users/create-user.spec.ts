import { describe, expect, it, vi } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { UsersRepository } from '../../repositories/users-repository'
import { CreateUserDTO } from '../../@types/DTOs/users/create-user-dto'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { isValidAge } from '../../utils/is-valid-age'

const mockUsersRepository = {
  findByEmail: vi.fn(),
  findByCpf: vi.fn(),
  create: vi.fn(),
}

describe('Create user', () => {
  it('should successfully create an user', async () => {
    const createUserUseCase = new CreateUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    mockUsersRepository.findByEmail.mockResolvedValue(null)
    mockUsersRepository.findByCpf.mockResolvedValue(null)
    mockUsersRepository.create.mockResolvedValue(null)

    const userData: CreateUserDTO = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'securepassword',
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

    await expect(createUserUseCase.execute(userData)).resolves.not.toThrow()
    expect(mockUsersRepository.create).toHaveBeenCalledWith(userData)
  })

  it('should throw an error if email is already in use', async () => {
    const createUserUseCase = new CreateUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    mockUsersRepository.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
    })
    mockUsersRepository.findByCpf.mockResolvedValue(null)

    const userData: CreateUserDTO = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'securepassword',
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

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      UserAlreadyExistsError,
    )
  })

  it('should throw an error if cpf is already in use', async () => {
    const createUserUseCase = new CreateUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    mockUsersRepository.findByEmail.mockResolvedValue(null)
    mockUsersRepository.findByCpf.mockResolvedValue({
      id: 1,
      cpf: '12345678901',
    })

    const userData: CreateUserDTO = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'securepassword',
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

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      UserAlreadyExistsError,
    )
  })
})

describe('isValidAge', () => {
  it('should return true if birth date is valid', () => {
    const birthDateString = '2000-01-01'
    expect(isValidAge(birthDateString)).toBe(true)
  })

  it('should throw an error if date format is invalid', () => {
    const birthDateString = 'invalid-date'
    expect(() => isValidAge(birthDateString)).toThrow()
  })

  it('should throw an error if user is under 18', () => {
    const birthDateString = '2010-01-01'
    expect(() => isValidAge(birthDateString)).toThrow()
  })
})
