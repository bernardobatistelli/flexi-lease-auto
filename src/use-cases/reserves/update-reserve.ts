/* eslint-disable no-useless-constructor */
import { UpdateReserverDTO } from '../../@types/DTOs/reserves/update-reserve-dto'
import { IReserve } from '../../@types/interfaces/reserve-interface'
import { ReservesRepository } from '../../repositories/reserves-repository'

export class UpdateReserveUseCase {
  constructor(private reservesRepository: ReservesRepository) {}

  async execute(data: UpdateReserverDTO): Promise<IReserve> {
    const reserve = await this.reservesRepository.save(data)

    return reserve
  }
}
