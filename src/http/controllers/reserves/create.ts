/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'
import { CreateReserveUseCase } from '../../../use-cases/reserves/create-reserve'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { GetCarByIdUseCase } from '../../../use-cases/cars/get-car-by-id'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'
import { calculateDaysBetweenDates } from '../../../utils/difference-in-days'

import { TypeOrmUsersRepository } from '../../../repositories/typeorm/typeorm-users-repository'
import { GetUserByIdUseCase } from '../../../use-cases/users/get-user-by-id'
import { UnauthorizedError } from '../../../use-cases/errors/unauthorized'
import { CarAlreadyTakenError } from '../../../use-cases/errors/car-already-taken'
import { ReserveOnSameDayError } from '../../../use-cases/errors/reserve-on-same-day'

export class CreateReserveController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()
    const carsRepository = new TypeOrmCarsRepository()
    const getCarByIdUseCase = new GetCarByIdUseCase(carsRepository)
    const usersRepository = new TypeOrmUsersRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    const createReserveUseCase = new CreateReserveUseCase(reservesRepository)
    const userId = req.body.userId

    const createReserveSchema = z.object({
      start_date: z.string({
        required_error: 'O campo start_date é obrigatório',
        invalid_type_error:
          'O campo start_date deve ser uma string em formato de data, ex: 25/04/2005',
      }),
      end_date: z.string({
        required_error: 'O campo end_date é obrigatório',
        invalid_type_error:
          'O campo end_date deve ser uma string em formato de data, ex: 25/04/2005',
      }),
      car_id: z.string({
        required_error: 'O campo car_id é obrigatório',
        invalid_type_error: 'O campo car_id deve ser uma string',
      }),
    })

    try {
      const { end_date, start_date, car_id } = createReserveSchema.parse(
        req.body,
      )

      const car = await getCarByIdUseCase.execute(car_id)

      if (!car) {
        throw new ResourceNotFoundError()
      }

      const { qualified } = await getUserByIdUseCase.execute(userId)

      if (qualified === false) {
        throw new UnauthorizedError()
      }

      const days = calculateDaysBetweenDates(start_date, end_date)
      const totalValue = days * car.value_per_day

      const reserve = await createReserveUseCase.execute({
        car_id,
        end_date,
        start_date,
        user_id: userId,
        final_value: Number(totalValue.toFixed(2)),
      })

      return res.status(201).json(reserve)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      if (
        error instanceof CarAlreadyTakenError ||
        error instanceof ReserveOnSameDayError
      ) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
