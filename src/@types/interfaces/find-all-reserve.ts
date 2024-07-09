import { IReserve } from './reserve-interface'

export class IFindAllReserves {
  reserve: IReserve[]
  total: number
  limit: number
  offset: number
  offsets: number
}
