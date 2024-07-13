/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { UpdateAccessoryUseCase } from '../../../use-cases/cars/update-accessory'

export class UpdateAccessoryController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const updateAccessoryUseCase = new UpdateAccessoryUseCase(carsRepository)

    const updateAccessorySchema = z.object({
      description: z.string({
        invalid_type_error: 'O campo description deve ser uma string',
        required_error: 'O campo description é obrigatório',
      }),
    })
    try {
      const { description } = updateAccessorySchema.parse(req.body)

      console.log(description)

      const carId = req.params.carId

      console.log(carId)

      const accessoryIndex = Number(req.params.accessoryIndex)

      console.log(accessoryIndex)

      const car = await updateAccessoryUseCase.execute(
        {
          car_id: carId,
          description,
        },
        accessoryIndex,
      )

      console.log(car)

      return res.status(201).json({ car, accessoryIndex })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
