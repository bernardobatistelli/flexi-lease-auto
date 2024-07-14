/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { TypeOrmCarsRepository } from '../../../repositories/typeorm/typeorm-cars-repository'
import { UpdateAccessoryUseCase } from '../../../use-cases/cars/update-accessory'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found'

export class UpdateAccessoryController {
  async execute(req: Request, res: Response) {
    const carsRepository = new TypeOrmCarsRepository()

    const updateAccessoryUseCase = new UpdateAccessoryUseCase(carsRepository)

    const updateAccessorySchema = z.object({
      description: z
        .string({
          invalid_type_error: 'O campo description deve ser uma string',
          required_error: 'O campo description é obrigatório',
        })
        .min(5, {
          message: 'O campo description deve ter no mínimo 5 caracteres',
        }),
    })
    try {
      const { description } = updateAccessorySchema.parse(req.body)

      const carId = req.params.carId

      const accessoryIndex = Number(req.params.accessoryIndex)

      const car = await updateAccessoryUseCase.execute(
        {
          car_id: carId,
          description,
        },
        accessoryIndex,
      )

      return res.status(201).json({ car, accessoryIndex })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors })
      }
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
  }
}
