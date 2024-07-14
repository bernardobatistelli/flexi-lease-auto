/* eslint-disable no-useless-constructor */
import {
  areIntervalsOverlapping,
  getOverlappingDaysInIntervals,
  interval,
  parse,
} from 'date-fns'
import { UpdateReserverDTO } from '../../@types/DTOs/reserves/update-reserve-dto'
import { IReserve } from '../../@types/interfaces/reserve-interface'
import { ReservesRepository } from '../../repositories/reserves-repository'
import { CarAlreadyTakenError } from '../errors/car-already-taken'
import { ReserveOnSameDayError } from '../errors/reserve-on-same-day'

export class UpdateReserveUseCase {
  constructor(private reservesRepository: ReservesRepository) {}

  async execute(data: UpdateReserverDTO): Promise<IReserve> {
    const carReserves = await this.reservesRepository.findByCarId(data.id_car)
    const userReserves = await this.reservesRepository.findByUserId(
      data.id_user,
    )

    const startDate = parse(data.start_date, 'dd/MM/yyyy', new Date())
    const endDate = parse(data.end_date, 'dd/MM/yyyy', new Date())

    if (carReserves) {
      carReserves.forEach((reserve) => {
        const reserveInterval = interval(startDate, endDate)
        const carInterval = interval(
          parse(reserve.start_date, 'dd/MM/yyyy', new Date()),
          parse(reserve.end_date, 'dd/MM/yyyy', new Date()),
        )
        console.log(getOverlappingDaysInIntervals(carInterval, reserveInterval))

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
        console.log(
          getOverlappingDaysInIntervals(userInterval, reserveInterval),
        )

        if (areIntervalsOverlapping(reserveInterval, userInterval)) {
          throw new ReserveOnSameDayError()
        }
      })
    }

    const reserve = await this.reservesRepository.save(data)

    return reserve
  }
}
