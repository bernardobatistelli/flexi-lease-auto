import { Repository } from 'typeorm'
import { CarsRepository } from '../cars-repository'
import { Car } from '../../entities/car'
import { AppDataSource } from '../../data-source'
import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { IFindAllCars } from '../../@types/interfaces/find-all-cars-interface'
import { UpdateCarDto } from '../../@types/DTOs/cars/update-car-dto'
import { UpdateAccessoryDTO } from '../../@types/DTOs/cars/update-accessory-dto'
import { IAcessory } from '../../@types/interfaces/update-accessory'

export class TypeOrmCarsRepository implements CarsRepository {
  private ormRepository: Repository<Car>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Car)
  }

  public async create(data: CreateCarDto): Promise<ICar> {
    const car = this.ormRepository.create(data)

    await this.ormRepository.save(car)

    return car
  }

  public async save(car: ICar): Promise<ICar> {
    return this.ormRepository.save(car)
  }

  public async findAll(): Promise<IFindAllCars> {
    const cars = await this.ormRepository.find()
    const findAllCars: IFindAllCars = {
      car: cars,
      total: cars.length,
      limit: 10,
      offset: 0,
      offsets: 0,
    }
    return findAllCars
  }

  public async findById(id: string): Promise<ICar | null> {
    const car = await this.ormRepository.findOneBy({
      id,
    })
    return car || null
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async update(data: UpdateCarDto): Promise<ICar> {
    const car = await this.ormRepository.save(data)
    return car
  }

  public async updateAccessory(
    data: UpdateAccessoryDTO,
    id: string,
  ): Promise<IAcessory | null> {
    const car = await this.ormRepository.findOneBy({ id })
    if (!car) {
      return null
    }

    const accessory = car.accessories.find(
      (accessory) => accessory.description === data.description,
    )

    if (!accessory) {
      return null
    }

    Object.assign(accessory, data)

    await this.ormRepository.save(car)

    return accessory
  }
}
