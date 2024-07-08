import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCarsRepository } from "../../repositories/in-memory/in-memory-cars-repository";
import { GetAllCarsUseCase } from "./get-all-cars";
import {  IFindAllCars } from '../../@types/interfaces/find-all-cars-interface';
import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto';
import { CarPaginationParms } from "../../repositories/cars-repository";

let carsRepository: InMemoryCarsRepository;
let getAllCarsUseCase: GetAllCarsUseCase;

describe('GetAllCarsUseCase', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    getAllCarsUseCase = new GetAllCarsUseCase(carsRepository);
  });

  it('should return all cars with no filters', async () => {
    const carData1: CreateCarDto = {
      model: 'Camry',
      color: 'Silver',
      year: '2022',
      value_per_day: 50,
      accessories: [],
      number_of_passengers: 4,
    };

    const carData2: CreateCarDto = {
      model: 'Civic',
      color: 'Black',
      year: '2021',
      value_per_day: 40,
      accessories: [],
      number_of_passengers: 5,
    };

    await carsRepository.create(carData1);
    await carsRepository.create(carData2);

    const params: CarPaginationParms = {
      page: 1,
      perPage: 10,
    };

    const result: IFindAllCars = await getAllCarsUseCase.execute(params);

    expect(result).toBeDefined();
    expect(result.car).toHaveLength(2); 
    expect(result.car[0].model).toBe('Camry');
    expect(result.car[1].model).toBe('Civic'); 
    expect(result.total).toBe(2); 
  });

});
