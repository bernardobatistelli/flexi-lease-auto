/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z } from 'zod'
import { TypeOrmReservesRepository } from '../../../repositories/typeorm/typeorm-reserve-repository'
import { CreateReserveUseCase } from '../../../use-cases/reserves/create-reserve'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { GetCarByIdUseCase } from '../../../use-cases/cars/get-car-by-id'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'
import { calculateDaysBetweenDates } from '../../../utils/difference-in-days'

export class CreateReserveController {
  async execute(req: Request, res: Response) {
    const reservesRepository = new TypeOrmReservesRepository()
    const carsRepository = new TypeOrmCarsRepository()
    const getCarByIdUseCase = new GetCarByIdUseCase(carsRepository)

    const createReserveUseCase = new CreateReserveUseCase(reservesRepository)
    const userId = req.body.userId

    const createReserveSchema = z.object({
      start_date: z.string(),
      end_date: z.string(),
      car_id: z.string(),
    })

    try {
      const { end_date, start_date, car_id } = createReserveSchema.parse(
        req.body,
      )

      const car = await getCarByIdUseCase.execute(car_id)

      if (!car) {
        throw new ResourceNotFoundError()
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
      return res.status(400).json({ error: error.message })
    }
  }
}
