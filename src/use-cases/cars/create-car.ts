/* eslint-disable no-useless-constructor */
import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { CarsRepository } from '../../repositories/cars-repository'
import { InvalidYearError } from '../errors/invalid-year'

export class CreateCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(data: CreateCarDto): Promise<ICar> {
    if (parseInt(data.year) <= 1950 || parseInt(data.year) >= 2023) {
      throw new InvalidYearError()
    }

    const car = await this.carRepository.create(data)

    return car
  }
}
