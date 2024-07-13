import { CreateCarDto } from '../../@types/DTOs/cars/create-car-dto'
import { UpdateAccessoryDTO } from '../../@types/DTOs/cars/update-accessory-dto'
import { UpdateCarDto } from '../../@types/DTOs/cars/update-car-dto'
import { ICar } from '../../@types/interfaces/car-interface'
import { CarsRepository } from '../cars-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCarsRepository implements CarsRepository {
  public items: ICar[] = []

  async findById(id: string) {
    const car = this.items.find((item) => item.id === id)

    if (!car) {
      return null
    }

    return car
  }

  async findAll() {
    return {
      car: this.items,
      total: this.items.length,
      limit: 10,
      offset: 0,
      offsets: 0,
    }
  }

  async create(data: CreateCarDto): Promise<ICar> {
    const car = {
      model: data.model,
      color: data.color,
      year: data.year,
      value_per_day: data.value_per_day,
      accessories: data.accessories,
      number_of_passengers: data.number_of_passengers,
    }

    const newCar: ICar = {
      id: randomUUID(),
      ...car,
    }

    this.items.push(newCar)

    return newCar
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((car) => car.id !== id)
  }

  async update(car: UpdateCarDto): Promise<ICar> {
    const index = this.items.findIndex((item) => item.id === car.id)

    if (index === -1) {
      return car
    }

    this.items[index] = car
  }

  async updateAccessory(
    data: UpdateAccessoryDTO,
    index: number,
  ): Promise<ICar | null> {
    const car = this.items.find((item) => data.car_id === item.id)

    if (!car) {
      return null
    }

    const accessoryIndex = car.accessories.findIndex(
      (accessory) => accessory[index] === index,
    )

    if (accessoryIndex === -1) {
      return null
    }

    const accessory = car.accessories[accessoryIndex]

    accessory.description = data.description

    Object.assign(car, accessory)

    return car
  }

  async save(car: ICar): Promise<ICar> {
    this.items.push(car)

    return car
  }
}
