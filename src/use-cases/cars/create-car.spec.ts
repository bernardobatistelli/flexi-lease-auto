import { expect, describe, it, beforeEach } from 'vitest'

import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto';
import { InMemoryCarsRepository } from '../../repositories/in-memory/in-memory-cars-repository';
import { CreateCarUseCase } from './create-car';

let carsRepository: InMemoryCarsRepository
let sut: CreateCarUseCase

describe('CreateCarUseCase', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository()
    sut = new CreateCarUseCase(carsRepository)
  })

    it('should return the created car', async () => {
      const carData: CreateCarDto = {
        model: 'Camry',
        year: '2022',
        color: 'Silver',
        value_per_day: 50,
        accessories: [],
        number_of_passengers: 4,
      };
      const createdCar = await sut.execute(carData);
      expect(createdCar).toBeDefined();
      expect(createdCar.model).toBe(carData.model);
      expect(createdCar.year).toBe(carData.year);
      expect(createdCar.color).toBe(carData.color);
      expect(createdCar.value_per_day).toBe(carData.value_per_day);
      expect(createdCar.accessories).toEqual(carData.accessories);
      expect(createdCar.number_of_passengers).toBe(carData.number_of_passengers);
    });
  });