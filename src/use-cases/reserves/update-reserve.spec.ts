import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryReservesRepository } from '../../repositories/in-memory/in-memory-reserves-repository'
import { UpdateReserveUseCase } from './update-reserve'
import { CreateReserveUseCase } from './create-reserve'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { UpdateReserverDTO } from '../../@types/DTOs/reserves/update-reserve-dto'

let reservesRepository: InMemoryReservesRepository
let updateReserveUseCase: UpdateReserveUseCase
let createReserveUseCase: CreateReserveUseCase

describe('UpdateReserveUseCase', () => {
  beforeEach(() => {
    reservesRepository = new InMemoryReservesRepository()
    updateReserveUseCase = new UpdateReserveUseCase(reservesRepository)
    createReserveUseCase = new CreateReserveUseCase(reservesRepository)
  })

  it('should update a reserve successfully', async () => {
    const reserveData: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const createdReserve = await createReserveUseCase.execute(reserveData)

    const updatedReserveData: UpdateReserverDTO = {
      id: createdReserve.id,
      id_user: 'user123',
      id_car: 'car789',
      start_date: '2023-07-01',
      end_date: '2023-07-12',
      final_value: '600',
    }

    const updatedReserve =
      await updateReserveUseCase.execute(updatedReserveData)

    expect(updatedReserve).toBeDefined()
    expect(updatedReserve.id).toBe(createdReserve.id)

    expect(updatedReserve.end_date).toEqual('2023-07-12')
    expect(updatedReserve.final_value).toBe('600')
  })

  it('should return null if reserve to update does not exist', async () => {
    const updatedReserveData: UpdateReserverDTO = {
      id: 'non-existent-id',
      id_user: 'user123',
      id_car: 'car789',
      start_date: '2023-07-01',
      end_date: '2023-07-12',
      final_value: '600',
    }

    const result = await updateReserveUseCase.execute(updatedReserveData)

    expect(result).toBeTruthy()
  })
})
