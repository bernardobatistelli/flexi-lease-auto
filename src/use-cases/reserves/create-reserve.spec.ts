import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryReservesRepository } from '../../repositories/in-memory/in-memory-reserves-repository'
import { CreateReserveUseCase } from './create-reserve'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { IReserve } from '../../@types/interfaces/reserve-interface'

let reservesRepository: InMemoryReservesRepository
let createReserveUseCase: CreateReserveUseCase

describe('CreateReserveUseCase', () => {
  beforeEach(() => {
    reservesRepository = new InMemoryReservesRepository()
    createReserveUseCase = new CreateReserveUseCase(reservesRepository)
  })

  it('should create a reserve successfully', async () => {
    const reserveData: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const createdReserve: IReserve =
      await createReserveUseCase.execute(reserveData)

    expect(createdReserve).toBeDefined()
    expect(createdReserve.id).toBeDefined()
    expect(createdReserve.final_value).toBe('500')

    const storedReserve = await reservesRepository.findById(createdReserve.id)
    expect(storedReserve).toEqual(createdReserve)
  })

  it('should throw an error if reserve creation fails', async () => {
    reservesRepository.create = vi
      .fn()
      .mockRejectedValue(new Error('Reserve creation failed'))

    const reserveData: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    try {
      await createReserveUseCase.execute(reserveData)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Reserve creation failed')
    }
  })
})
