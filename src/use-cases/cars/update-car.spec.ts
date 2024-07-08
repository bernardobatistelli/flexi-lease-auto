import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCarsRepository } from "../../repositories/in-memory/in-memory-cars-repository";
import { UpdateCarUseCase } from "./update-car";
import { UpdateCarDto } from '../../@types/DTOs/cars/update-car-dto';
import { ICar } from '../../@types/interfaces/car-interface';

let carsRepository: InMemoryCarsRepository;
let updateCarUseCase: UpdateCarUseCase;

describe('UpdateCarUseCase', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    updateCarUseCase = new UpdateCarUseCase(carsRepository);
  });

  it('should update a car successfully', async () => {
    const initialCarData: UpdateCarDto = {
      id: '123',
      model: 'Camry',
      year: '2022',
      color: 'Silver',
      value_per_day: 50,
      accessories: [],
      number_of_passengers: 4,
    };

    await carsRepository.create(initialCarData);

    const updatedCarData: UpdateCarDto = {
      id: '123',
      model: 'Corolla',
      year: '2023',
      color: 'Black',
      value_per_day: 60,
      accessories: [],
      number_of_passengers: 5,
    };

    const updatedCar: ICar = await updateCarUseCase.execute(updatedCarData);

    const retrievedCar: ICar | null = await carsRepository.findById('123');

    expect(updatedCar).toBeDefined();
    expect(updatedCar.model).toBe('Corolla');
    expect(updatedCar.year).toBe('2023');
    expect(updatedCar.color).toBe('Black');
    expect(updatedCar.value_per_day).toBe(60);
    expect(updatedCar.accessories).toEqual([]);
    expect(updatedCar.number_of_passengers).toBe(5);
  });

});
