/* eslint-disable no-useless-constructor */
import { ReservesRepository } from '../../repositories/reserves-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class DeleteReserveUseCase {
  constructor(private reserveRepository: ReservesRepository) {}

  async execute(id: string): Promise<void> {
    const reserve = await this.reserveRepository.findById(id)
    if (!reserve) {
      throw new ResourceNotFoundError()
    }
    await this.reserveRepository.delete(id)
  }
}
