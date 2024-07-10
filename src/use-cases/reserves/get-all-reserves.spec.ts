import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryReservesRepository } from '../../repositories/in-memory/in-memory-reserves-repository'
import { GetAllReservesUseCase } from './get-all-reserves'
import { CreateReserveUseCase } from './create-reserve'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'

let reservesRepository: InMemoryReservesRepository
let getAllReservesUseCase: GetAllReservesUseCase
let createReserveUseCase: CreateReserveUseCase

describe('GetAllReservesUseCase', () => {
  beforeEach(() => {
    reservesRepository = new InMemoryReservesRepository()
    getAllReservesUseCase = new GetAllReservesUseCase(reservesRepository)
    createReserveUseCase = new CreateReserveUseCase(reservesRepository)
  })

  it('should return all reserves', async () => {
    const reserveData1: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const reserveData2: CreateReserverDTO = {
      user_id: 'user789',
      car_id: 'car123',
      start_date: '2023-08-01',
      end_date: '2023-08-10',
      final_value: 600,
    }

    await createReserveUseCase.execute(reserveData1)
    await createReserveUseCase.execute(reserveData2)

    const result = await getAllReservesUseCase.execute({})

    expect(result).toBeDefined()
    expect(result.reserve.length).toBe(2)
    expect(result.total).toBe(2)
  })

  it('should filter reserves by user ID', async () => {
    const reserveData1: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const reserveData2: CreateReserverDTO = {
      user_id: 'user789',
      car_id: 'car123',
      start_date: '2023-08-01',
      end_date: '2023-08-10',
      final_value: 600,
    }

    await createReserveUseCase.execute(reserveData1)
    await createReserveUseCase.execute(reserveData2)

    const result = await getAllReservesUseCase.execute({ id_user: 'user123' })

    expect(result).toBeDefined()
  })

  it('should paginate results', async () => {
    for (let i = 1; i <= 15; i++) {
      const reserveData: CreateReserverDTO = {
        user_id: `user${i}`,
        car_id: `car${i}`,
        start_date: `2023-07-${i < 10 ? '0' + i : i}`,
        end_date: `2023-07-${i < 10 ? '0' + (i + 1) : i + 1}`,
        final_value: i * 100,
      }
      await createReserveUseCase.execute(reserveData)
    }

    const resultPage1 = await getAllReservesUseCase.execute({
      page: 1,
      perPage: 10,
    })
    const resultPage2 = await getAllReservesUseCase.execute({
      page: 2,
      perPage: 10,
    })

    expect(resultPage1).toBeDefined()
    expect(resultPage1.reserve.length).toBe(10)
    expect(resultPage1.total).toBe(15)
    expect(resultPage1.limit).toBe(10)
    expect(resultPage1.offset).toBe(0)

    expect(resultPage2).toBeDefined()
    expect(resultPage2.reserve.length).toBe(5)
    expect(resultPage2.total).toBe(15)
    expect(resultPage2.limit).toBe(10)
    expect(resultPage2.offset).toBe(10)
  })

  it('should filter reserves by start and end date', async () => {
    const reserveData1: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const reserveData2: CreateReserverDTO = {
      user_id: 'user789',
      car_id: 'car123',
      start_date: '2023-08-01',
      end_date: '2023-08-10',
      final_value: 600,
    }

    await createReserveUseCase.execute(reserveData1)
    await createReserveUseCase.execute(reserveData2)

    const result = await getAllReservesUseCase.execute({
      start_date: '2023-07-01',
      end_date: '2023-07-31',
    })

    expect(result).toBeDefined()
    expect(result.reserve.length).toBe(1)
    expect(result.total).toBe(1)
  })

  it('should filter reserves by final value', async () => {
    const reserveData1: CreateReserverDTO = {
      user_id: 'user123',
      car_id: 'car456',
      start_date: '2023-07-01',
      end_date: '2023-07-10',
      final_value: 500,
    }

    const reserveData2: CreateReserverDTO = {
      user_id: 'user789',
      car_id: 'car123',
      start_date: '2023-08-01',
      end_date: '2023-08-10',
      final_value: 600,
    }

    await createReserveUseCase.execute(reserveData1)
    await createReserveUseCase.execute(reserveData2)

    const result = await getAllReservesUseCase.execute({ final_value: '500' })

    expect(result).toBeDefined()
    expect(result.reserve.length).toBe(1)
    expect(result.total).toBe(1)
    expect(result.reserve[0].final_value).toBe('500')
  })
})
