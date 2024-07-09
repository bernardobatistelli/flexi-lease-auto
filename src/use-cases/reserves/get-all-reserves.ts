/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { IFindAllReserves } from '../../@types/interfaces/find-all-reserve'
import {
  ReservePaginationParms,
  ReservesRepository,
} from '../../repositories/reserves-repository'

export class GetAllReservesUseCase {
  constructor(private reserveRepository: ReservesRepository) {}

  async execute({
    end_date,
    final_value,
    id_reserve,
    id_user,
    start_date,
    page,
    perPage,
  }: ReservePaginationParms): Promise<IFindAllReserves> {
    return this.reserveRepository.findAll({
      end_date,
      final_value,
      id_reserve,
      page,
      perPage,
      id_user,
      start_date,
    })
  }
}
