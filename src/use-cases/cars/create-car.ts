/* eslint-disable no-useless-constructor */
import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { CarsRepository } from '../../repositories/cars-repository'
import { InvalidYearError } from '../errors/invalid-year'
import { SameAccessoryError } from '../errors/same-accessory'

export class CreateCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute(data: CreateCarDto): Promise<ICar> {
    if (parseInt(data.year) <= 1950 || parseInt(data.year) >= 2023) {
      throw new InvalidYearError()
    }

    if (
      data.accessories.some((accessory, index) => {
        return data.accessories
          .slice(index + 1)
          .some(
            (otherAccessory) =>
              accessory.description === otherAccessory.description,
          )
      })
    ) {
      throw new SameAccessoryError()
    }

    const car = await this.carRepository.create(data)

    return car
  }
}
