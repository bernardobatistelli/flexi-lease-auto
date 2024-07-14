/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto'
import {
  ReservePaginationParms,
  ReservesRepository,
} from '../reserves-repository'
import { IReserve } from '../../@types/interfaces/reserve-interface'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { IFindAllReserves } from '../../@types/interfaces/find-all-reserve'
import { UpdateReserverDTO } from '../../@types/DTOs/reserves/update-reserve-dto'

export class InMemoryReservesRepository implements ReservesRepository {
  private items: IReserve[] = []

  async findByCarId(id: string): Promise<IReserve[] | null> {
    return this.items.filter((item) => item.id_car === id) || null
  }

  async findByUserId(id: string): Promise<IReserve[] | null> {
    return this.items.filter((item) => item.id_user === id) || null
  }

  async create(data: CreateReserverDTO): Promise<IReserve> {
    const reserve: IReserve = {
      id: randomUUID(),
      ...data,
      id_user: '',
      id_car: '',
      final_value: data.final_value.toString(),
    }

    this.items.push(reserve)
    return reserve
  }

  async findAll(
    params: ReservePaginationParms,
  ): Promise<IFindAllReserves | null> {
    let filteredItems = this.items

    if (params.id_user) {
      filteredItems = filteredItems.filter(
        (item) => item.id_user === params.id_user,
      )
    }
    if (params.start_date) {
      filteredItems = filteredItems.filter(
        (item) => new Date(item.start_date) >= new Date(params.start_date),
      )
    }
    if (params.end_date) {
      filteredItems = filteredItems.filter(
        (item) => new Date(item.end_date) <= new Date(params.end_date),
      )
    }
    if (params.id_reserve) {
      filteredItems = filteredItems.filter(
        (item) => item.id === params.id_reserve,
      )
    }
    if (params.final_value) {
      filteredItems = filteredItems.filter(
        (item) =>
          parseFloat(item.final_value) === parseFloat(params.final_value),
      )
    }

    const page = params.page || 1
    const perPage = params.perPage || 10
    const total = filteredItems.length
    const offset = (page - 1) * perPage
    const paginatedItems = filteredItems.slice(offset, offset + perPage)

    return {
      reserve: paginatedItems,
      total,
      limit: perPage,
      offset,
      offsets: Math.ceil(total / perPage),
    }
  }

  async findById(id: string): Promise<IReserve | null> {
    return this.items.find((item) => item.id === id) || null
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async update(data: UpdateReserverDTO): Promise<IReserve | null> {
    const index = this.items.findIndex((item) => item.id === data.id)

    if (index === -1) {
      return null
    }

    const updatedReserve = {
      ...this.items[index],
      ...data,
    }

    this.items[index] = updatedReserve
    return updatedReserve
  }

  async save(reserve: IReserve): Promise<IReserve> {
    const index = this.items.findIndex((item) => item.id === reserve.id)

    if (index !== -1) {
      this.items[index] = reserve
    } else {
      this.items.push(reserve)
    }

    return reserve
  }
}
