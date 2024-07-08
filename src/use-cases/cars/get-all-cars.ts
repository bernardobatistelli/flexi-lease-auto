/* eslint-disable no-useless-constructor */
import { IFindAllCars } from '../../@types/interfaces/find-all-cars-interface'
import { CarsRepository } from '../../repositories/cars-repository'

export class GetAllCarsUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(): Promise<IFindAllCars> {
    return this.carRepository.findAll()
  }
}
