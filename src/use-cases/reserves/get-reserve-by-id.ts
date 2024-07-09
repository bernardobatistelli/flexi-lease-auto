/* eslint-disable no-useless-constructor */
import { IReserve } from '../../@types/interfaces/reserve-interface'
import { ReservesRepository } from '../../repositories/reserves-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class GetReserveByIdUseCase {
  constructor(private reserveRepository: ReservesRepository) {}

  async execute(id: string): Promise<IReserve> {
    const reserve = await this.reserveRepository.findById(id)

    if (!reserve) {
      throw new ResourceNotFoundError()
    }

    return reserve
  }
}
