import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryReservesRepository } from '../../repositories/in-memory/in-memory-reserves-repository'
import { DeleteReserveUseCase } from './delete-reserve'
import { CreateReserveUseCase } from './create-reserve'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let reservesRepository: InMemoryReservesRepository
let deleteReserveUseCase: DeleteReserveUseCase
let createReserveUseCase: CreateReserveUseCase

describe('DeleteReserveUseCase', () => {
  beforeEach(() => {
    reservesRepository = new InMemoryReservesRepository()
    deleteReserveUseCase = new DeleteReserveUseCase(reservesRepository)
    createReserveUseCase = new CreateReserveUseCase(reservesRepository)
  })

  it('should delete a reserve successfully', async () => {
    const reserveData: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const createdReserve = await createReserveUseCase.execute(reserveData)

    await deleteReserveUseCase.execute(createdReserve.id)

    const reserveAfterDeletion = await reservesRepository.findById(
      createdReserve.id,
    )
    expect(reserveAfterDeletion).toBeNull()
  })

  it('should throw an error if reserve does not exist', async () => {
    try {
      await deleteReserveUseCase.execute('non-existent-id')
    } catch (error) {
      expect(error).toBeInstanceOf(ResourceNotFoundError)
    }
  })

  it('should throw an error if there is a problem deleting the reserve', async () => {
    const reserveData: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const createdReserve = await createReserveUseCase.execute(reserveData)

    reservesRepository.delete = vi
      .fn()
      .mockRejectedValue(new Error('Problem deleting reserve'))

    try {
      await deleteReserveUseCase.execute(createdReserve.id)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Problem deleting reserve')
    }
  })
})
