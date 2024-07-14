/* eslint-disable no-useless-constructor */

import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { IReserve } from '../../@types/interfaces/reserve-interface'
import { ReservesRepository } from '../../repositories/reserves-repository'
import { areIntervalsOverlapping, interval, parse } from 'date-fns'
import { CarAlreadyTakenError } from '../errors/car-already-taken'
import { ReserveOnSameDayError } from '../errors/reserve-on-same-day'

export class CreateReserveUseCase {
  constructor(private reserveRepository: ReservesRepository) {}

  async execute(data: CreateReserverDTO): Promise<IReserve> {
    const carReserves = await this.reserveRepository.findByCarId(data.car_id)
    const userReserves = await this.reserveRepository.findByUserId(data.user_id)

    const startDate = parse(data.start_date, 'dd/MM/yyyy', new Date())
    const endDate = parse(data.end_date, 'dd/MM/yyyy', new Date())

    if (carReserves) {
      carReserves.forEach((reserve) => {
        const reserveInterval = interval(startDate, endDate)
        const carInterval = interval(
          parse(reserve.start_date, 'dd/MM/yyyy', new Date()),
          parse(reserve.end_date, 'dd/MM/yyyy', new Date()),
        )

        if (areIntervalsOverlapping(reserveInterval, carInterval)) {
          throw new CarAlreadyTakenError()
        }
      })
    }

    if (userReserves) {
      userReserves.forEach((reserve) => {
        const reserveInterval = interval(startDate, endDate)
        const userInterval = interval(
          parse(reserve.start_date, 'dd/MM/yyyy', new Date()),
          parse(reserve.end_date, 'dd/MM/yyyy', new Date()),
        )

        if (areIntervalsOverlapping(reserveInterval, userInterval)) {
          throw new ReserveOnSameDayError()
        }
      })
    }

    const reserve = await this.reserveRepository.create(data)

    return reserve
  }
}
