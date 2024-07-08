import { CreateCarDto } from '../@types/DTOs/cars/create-car-dto'
import { UpdateAccessoryDTO } from '../@types/DTOs/cars/update-accessory-dto'
import { UpdateCarDto } from '../@types/DTOs/cars/update-car-dto'
import { ICar } from '../@types/interfaces/car-interface'
import { IFindAllCars } from '../@types/interfaces/find-all-cars-interface'
import { IAcessory } from '../@types/interfaces/update-accessory'

export interface CarPaginationParms {
  color?: string
  model?: string
  number_of_passengers?: number
  value_per_day?: number
  year?: string
  page?: number
  perPage?: number
}

export interface CarsRepository {
  create(data: CreateCarDto): Promise<ICar>
  findAll(params: CarPaginationParms): Promise<IFindAllCars | null>
  findById(id: string): Promise<ICar | null>
  delete(id: string): Promise<void>
  update(data: UpdateCarDto): Promise<ICar | null>
  updateAccessory(
    data: UpdateAccessoryDTO,
    id: string,
  ): Promise<IAcessory | null>
  save(user: ICar): Promise<ICar>
}
