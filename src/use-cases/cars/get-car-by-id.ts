/* eslint-disable no-useless-constructor */
import { ICar } from '../../@types/interfaces/car-interface'
import { CarsRepository } from '../../repositories/cars-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class GetCarById {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string): Promise<ICar> {
    const car = await this.carRepository.findById(id)

    if (!car) {
      throw new ResourceNotFoundError()
    }

    return car
  }
}
