/* eslint-disable no-useless-constructor */
import { UpdateCarDto } from '../../@types/DTOs/cars/update-car-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { CarsRepository } from '../../repositories/cars-repository'

export class UpdateCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute(data: UpdateCarDto): Promise<ICar> {
    const car = await this.carsRepository.save(data)

    return car
  }
}
