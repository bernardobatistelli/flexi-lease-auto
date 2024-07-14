/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { ObjectId } from 'mongodb'
import {
  Equal,
  FindOptionsWhere,
  LessThanOrEqual,
  MongoRepository,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'

import { IReserve } from '../../@types/interfaces/reserve-interface'
import { AppDataSource } from '../../data-source'
import { Reserve } from '../../entities/reserve'
import {
  ReservePaginationParms,
  ReservesRepository,
} from '../reserves-repository'
import { CreateReserverDTO } from '../../@types/DTOs/reserves/create-reserve-dto'
import { IFindAllReserves } from '../../@types/interfaces/find-all-reserve'
import { UpdateReserverDTO } from '../../@types/DTOs/reserves/update-reserve-dto'

export class TypeOrmReservesRepository implements ReservesRepository {
  private ormRepository: Repository<Reserve>
  private mongoOrmRepository: MongoRepository<Reserve>

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository(Reserve) ||
      AppDataSource.getMongoRepository(Reserve)
  }

  update(data: UpdateReserverDTO): Promise<IReserve | null> {
    throw new Error('Method not implemented.')
  }

  public async create(data: CreateReserverDTO): Promise<IReserve> {
    const reserve = this.ormRepository.create(data)

    await this.ormRepository.save(reserve)

    return reserve as unknown as IReserve
  }

  public async save(reserve: UpdateReserverDTO): Promise<IReserve | null> {
    const actualReserve = await this.ormRepository.findOne({
      where: {
        _id: new ObjectId(reserve.id),
      },
    })

    if (!actualReserve) {
      return null
    }

    const updatedReserve = await this.ormRepository.save({
      ...actualReserve,
      ...reserve,
      final_value: Number(reserve.final_value),
    })

    return {
      ...updatedReserve,
      final_value: updatedReserve.final_value.toString(),
    } as unknown as IReserve
  }

  public async findAll({
    perPage = 10,
    page = 1,
    end_date,
    final_value,
    id_reserve,
    id_user,
    start_date,
  }: ReservePaginationParms): Promise<IFindAllReserves> {
    const query: {
      [key: string]: string | number
    } = {}

    if (end_date) {
      query.end_date = end_date
    }

    if (final_value) {
      query.final_value = final_value
    }

    if (id_reserve) {
      query.id_reserve = id_reserve
    }

    if (id_user) {
      query.id_user = id_user
    }

    if (start_date) {
      query.start_date = start_date
    }

    const [reserves, total] = await this.ormRepository.findAndCount({
      where: query,

      skip: perPage * (page - 1),

      take: perPage,
    })

    const findAllReserves: IFindAllReserves = {
      reserve: reserves.map((reserve) => reserve as unknown as IReserve),

      total,

      limit: perPage,

      offset: page,

      offsets: Math.ceil(total / perPage),
    }

    return findAllReserves
  }

  public async findById(id: string): Promise<IReserve | null> {
    const reserve = await this.ormRepository.findOneBy({
      _id: new ObjectId(id),
    })

    return (reserve as unknown as IReserve) || null
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  async findConflictingReserves(
    car_id: string,
    startDate: string,
    endDate: string,
  ): Promise<IReserve[]> {
    const reserve = await this.ormRepository.find({
      where: {
        car_id,
        // start_date: Equal(startDate),
        // end_date: MoreThanOrEqual(endDate),
      },
    })

    return reserve as unknown as IReserve[]
  }
}
