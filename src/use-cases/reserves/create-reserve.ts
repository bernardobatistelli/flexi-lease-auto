/* eslint-disable no-useless-constructor */

import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { IReserve } from '../../@types/interfaces/reserve-interface'
import { ReservesRepository } from '../../repositories/reserves-repository'

export class CreateReserveUseCase {
  constructor(private reserveRepository: ReservesRepository) {}

  async execute(data: CreateReserverDTO): Promise<IReserve> {
    const reserve = await this.reserveRepository.create(data)

    return reserve
  }
}
