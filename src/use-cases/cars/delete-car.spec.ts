import { describe, it, expect, beforeEach, vi } from "vitest";
import { InMemoryCarsRepository } from "../../repositories/in-memory/in-memory-cars-repository";
import { DeleteCarUseCase } from "./delete-car";
import { UpdateCarDto } from "../../@types/DTOs/cars/update-car-dto";
import { CreateCarUseCase } from "./create-car";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { CreateCarDto } from "../../@types/DTOs/cars/create-car-dto";

let carsRepository: InMemoryCarsRepository;
let deleteCarUseCase: DeleteCarUseCase;
let createCarUseCase: CreateCarUseCase;

describe('deleteCar', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    deleteCarUseCase = new DeleteCarUseCase(carsRepository);
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should delete a car', async () => {
    const carData: CreateCarDto = {
      model: 'Camry',
      color: 'Silver',
      year: '2022',
      value_per_day: 50,
      accessories: [],
      number_of_passengers: 4,
    };

    const createdCar = await carsRepository.create(carData);

    await carsRepository.delete(createdCar.id);
    const deletedCar = await carsRepository.findById(createdCar.id);

    expect(deletedCar).toBeNull();
  });

  it('should return an error if car does not exist', async () => {
    try {
      await deleteCarUseCase.execute('non-existent-id');
    } catch (error) {
      expect(error).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  it('should return an error if there is a problem deleting the car', async () => {
    const carData: UpdateCarDto = {
      id: '123',
      model: 'Camry',
      year: '2022',
      color: 'Silver',
      value_per_day: 50,
      accessories: [],
      number_of_passengers: 4,
    };

    await createCarUseCase.execute(carData);

    carsRepository.delete = vi.fn().mockImplementation(() => {
      throw new Error('Problem deleting car');
    });

    try {
      await deleteCarUseCase.execute('123');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
