import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryReservesRepository } from '../../repositories/in-memory/in-memory-reserves-repository'
import { GetReserveByIdUseCase } from './get-reserve-by-id'
import { CreateReserveUseCase } from './create-reserve'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let reservesRepository: InMemoryReservesRepository
let getReserveByIdUseCase: GetReserveByIdUseCase
let createReserveUseCase: CreateReserveUseCase

describe('GetReserveByIdUseCase', () => {
  beforeEach(() => {
    reservesRepository = new InMemoryReservesRepository()
    getReserveByIdUseCase = new GetReserveByIdUseCase(reservesRepository)
    createReserveUseCase = new CreateReserveUseCase(reservesRepository)
  })

  it('should return a reserve by ID', async () => {
    const reserveData: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const createdReserve = await createReserveUseCase.execute(reserveData)
    const result = await getReserveByIdUseCase.execute(createdReserve.id)

    expect(result).toBeDefined()
    expect(result.id).toBe(createdReserve.id)
  })

  it('should throw an error if reserve is not found', async () => {
    await expect(
      getReserveByIdUseCase.execute('non-existent-id'),
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
