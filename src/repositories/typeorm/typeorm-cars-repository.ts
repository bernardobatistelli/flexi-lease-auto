/* eslint-disable camelcase */
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto'
import { UpdateAccessoryDTO } from '../../@types/DTOs/cars/update-accessory-dto'
import { UpdateCarDto } from '../../@types/DTOs/cars/update-car-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { IFindAllCars } from '../../@types/interfaces/find-all-cars-interface'
import { AppDataSource } from '../../data-source'
import { Car } from '../../entities/car'
import { CarPaginationParms, CarsRepository } from '../cars-repository'

export class TypeOrmCarsRepository implements CarsRepository {
  private ormRepository: Repository<Car>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Car)
  }

  public async create(data: CreateCarDto): Promise<ICar> {
    const car = this.ormRepository.create(data)

    await this.ormRepository.save(car)

    return car as unknown as ICar
  }

  public async save(car: UpdateCarDto): Promise<ICar | null> {
    const actualCar = await this.ormRepository.findOne({
      where: {
        _id: new ObjectId(car.id),
      },
    })

    if (!actualCar) {
      return null
    }

    const updatedCar = await this.ormRepository.save({
      ...actualCar,
      ...car,
    })

    return updatedCar
  }

  public async findAll({
    perPage = 10,
    page = 1,
    color,
    model,
    number_of_passengers,
    value_per_day,
    year,
  }: CarPaginationParms): Promise<IFindAllCars> {
    const query: {
      [key: string]: string | number
    } = {}

    if (color) {
      query.color = color
    }

    if (model) {
      query.model = model
    }

    if (number_of_passengers) {
      query.number_of_passengers = number_of_passengers
    }

    if (value_per_day) {
      query.value_per_day = value_per_day
    }

    if (year) {
      query.year = year
    }

    const [cars, total] = await this.ormRepository.findAndCount({
      where: query,

      skip: perPage * (page - 1),

      take: perPage,
    })

    const findAllCars: IFindAllCars = {
      car: cars.map((car) => car as unknown as ICar),

      total,

      limit: perPage,

      offset: page,

      offsets: Math.ceil(total / perPage),
    }

    return findAllCars
  }

  public async findById(id: string): Promise<ICar | null> {
    const car = await this.ormRepository.findOneBy({
      _id: new ObjectId(id),
    })

    return (car as unknown as ICar) || null
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async update(data: UpdateCarDto): Promise<ICar> {
    const car = await this.ormRepository.save(data)
    return car as unknown as ICar
  }

  public async updateAccessory(
    data: UpdateAccessoryDTO,
    index: number,
  ): Promise<ICar | null> {
    const car = await this.ormRepository.findOne({
      where: {
        _id: new ObjectId(data.car_id),
      },
    })
    if (!car) {
      return null
    }

    const accessory = car.accessories[index]

    if (!accessory) {
      return null
    }

    accessory.description = data.description

    Object.assign(car, accessory)

    console.log(car)

    await this.ormRepository.save(car)

    return car as unknown as ICar
  }
}
