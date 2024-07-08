/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { IFindAllCars } from '../../@types/interfaces/find-all-cars-interface'
import {
  CarPaginationParms,
  CarsRepository,
} from '../../repositories/cars-repository'

export class GetAllCarsUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute({
    color,
    model,
    number_of_passengers,
    page,
    perPage,
    value_per_day,
    year,
  }: CarPaginationParms): Promise<IFindAllCars> {
    return this.carRepository.findAll({
      color,
      model,
      number_of_passengers,
      page,
      perPage,
      value_per_day,
      year,
    })
  }
}
