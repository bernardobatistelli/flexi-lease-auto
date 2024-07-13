/* eslint-disable no-useless-constructor */
import { UpdateAccessoryDTO } from '../../@types/DTOs/cars/update-accessory-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { CarsRepository } from '../../repositories/cars-repository'
import { SameAccessoryError } from '../errors/same-accessory'

export class UpdateAccessoryUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute(data: UpdateAccessoryDTO, index: number): Promise<ICar | null> {
    const car = await this.carsRepository.updateAccessory(data, index)

    if (
      car.accessories.some((accessory, index) => {
        return car.accessories
          .slice(index + 1)
          .some(
            (otherAccessory) =>
              accessory.description === otherAccessory.description,
          )
      })
    ) {
      throw new SameAccessoryError()
    }

    return car
  }
}
