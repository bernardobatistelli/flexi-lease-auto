import { CreateReserverDTO } from '../@types/DTOs/reserves/create-reserve-dto'
import { UpdateReserverDTO } from '../@types/DTOs/reserves/update-reserve-dto'
import { IFindAllReserves } from '../@types/interfaces/find-all-reserve'
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
  findAll(params: ReservePaginationParms): Promise<IFindAllReserves | null>
  findById(id: string): Promise<IReserve | null>
  delete(id: string): Promise<void>
  update(data: UpdateReserverDTO): Promise<IReserve | null>
  save(reserve: UpdateReserverDTO): Promise<IReserve>
}
