import { CreateCarDto } from '../@types/DTOs/cars/create-car-dto'
import { ICar } from '../@types/interfaces/car-interface'

export interface CarsRepository {
  create(data: CreateCarDto): Promise<ICar>
}
