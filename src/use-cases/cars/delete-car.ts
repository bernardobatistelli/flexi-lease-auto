/* eslint-disable no-useless-constructor */
import { CarsRepository } from '../../repositories/cars-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class DeleteCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(id: string): Promise<void> {
    const car = await this.carRepository.findById(id)
    if (!car) {
      throw new ResourceNotFoundError()
    }
    await this.carRepository.delete(id)
  }
}
