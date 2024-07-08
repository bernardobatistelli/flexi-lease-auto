import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCarsRepository } from "../../repositories/in-memory/in-memory-cars-repository";
import { CreateCarDto } from "../../@types/DTOs/cars/create-car-dto";

let carsRepository: InMemoryCarsRepository;

beforeEach(() => {
  carsRepository = new InMemoryCarsRepository();
});

describe('Get car by Id', () => {
  it('should find a car by ID', async () => {
    const carData: CreateCarDto = {
      model: 'Camry',
      color: 'Silver',
      year: '2022',
      value_per_day: 50,
      accessories: [],
      number_of_passengers: 4,
    };
  
    const createdCar = await carsRepository.create(carData);
    const foundCar = await carsRepository.findById(createdCar.id);
  
    expect(foundCar).toBeDefined();
    expect(foundCar?.id).toBe(createdCar.id);
    expect(foundCar?.model).toBe('Camry');
    expect(foundCar?.color).toBe('Silver');
    expect(foundCar?.year).toBe('2022');
    expect(foundCar?.value_per_day).toBe(50);
    expect(foundCar?.accessories).toEqual([]);
    expect(foundCar?.number_of_passengers).toBe(4);
  });
})
