import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCarsRepository } from '../../repositories/in-memory/in-memory-cars-repository'
import { UpdateAccessoryDTO } from '../../@types/DTOs/cars/update-accessory-dto'
import { ICar } from '../../@types/interfaces/car-interface'

let carsRepository: InMemoryCarsRepository

describe('updateAccessory', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository()
  })

  it('should update an accessory description successfully', async () => {
    const car: ICar = {
      id: 'car123',
      model: 'Camry',
      year: '2022',
      color: 'Silver',
      value_per_day: 50,
      accessories: [{ description: 'GPS' }, { description: 'Sunroof' }],
      number_of_passengers: 4,
    }

    carsRepository.items.push(car)

    const updateAccessoryData: UpdateAccessoryDTO = {
      car_id: 'car123',
      description: 'Advanced GPS',
    }

    const updatedCar = await carsRepository.updateAccessory(
      updateAccessoryData,
      0,
    )

    expect(updatedCar).toBeDefined()
    expect(updatedCar.accessories[0].description).toEqual('Advanced GPS')
  })

  it('should return null if the car does not exist', async () => {
    const updateAccessoryData: UpdateAccessoryDTO = {
      car_id: 'non-existent-car',
      description: 'Advanced GPS',
    }

    const result = await carsRepository.updateAccessory(updateAccessoryData, 0)

    expect(result).toBeNull()
  })

  it('should return null if the accessory index does not exist', async () => {
    const car: ICar = {
      id: 'car123',
      model: 'Camry',
      year: '2022',
      color: 'Silver',
      value_per_day: 50,
      accessories: [{ description: 'GPS' }, { description: 'Sunroof' }],
      number_of_passengers: 4,
    }

    carsRepository.items.push(car)

    const updateAccessoryData: UpdateAccessoryDTO = {
      car_id: 'car123',
      description: 'Advanced GPS',
    }

    const result = await carsRepository.updateAccessory(updateAccessoryData, 5) // Invalid index

    expect(result).toBeNull()
  })
})
