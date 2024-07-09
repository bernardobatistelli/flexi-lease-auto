import { CreateReserverDTO } from '../@types/DTOs/reserves/create-reserve-dto'
import { IReserve } from '../@types/interfaces/reserve-interface'

export interface ReservePaginationParms {
  id_user?: string
  start_date?: string
  end_date?: string
  id_reserve?: string
  final_value?: string
  page?: number
  perPage?: number
}

export interface ReservesRepository {
  create(data: CreateReserverDTO): Promise<IReserve>
  //   findAll(params: ReservePaginationParms): Promise<IFindAllReserves | null>
  findById(id: string): Promise<IReserve | null>
  delete(id: string): Promise<void>
  //   update(data: UpdateReserveDto): Promise<IReserve | null>
  //   updateAccessory(
  //     data: UpdateAccessoryDTO,
  //     id: string,
  //   ): Promise<IAcessory | null>
  save(reserve: IReserve): Promise<IReserve>
}
