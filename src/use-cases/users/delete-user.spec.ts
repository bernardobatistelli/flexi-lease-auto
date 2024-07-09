import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DeleteUserUseCase } from './delete-user'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

const mockUsersRepository = {
  findById: vi.fn(),
  delete: vi.fn(),
}

describe('Delete user', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should delete a user successfully', async () => {
    const deleteUseCase = new DeleteUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const userId = '1234567890'
    mockUsersRepository.findById.mockResolvedValue({ id: userId })

    await expect(deleteUseCase.execute(userId)).resolves.not.toThrow()
    expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId)
    expect(mockUsersRepository.delete).toHaveBeenCalledWith(userId)
  })

  it('should throw a ResourceNotFoundError if a user is not found', async () => {
    const deleteUseCase = new DeleteUserUseCase(
      mockUsersRepository as unknown as UsersRepository,
    )

    const userId = 'nonexistent_id'
    mockUsersRepository.findById.mockResolvedValue(null)

    await expect(deleteUseCase.execute(userId)).rejects.toThrow(
      ResourceNotFoundError,
    )

    expect(mockUsersRepository.delete).not.toHaveBeenCalled()
  })
})
