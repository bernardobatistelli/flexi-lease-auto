import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Delete car (e2e)', () => {
  beforeAll(() => {})
  afterEach(() => {})
  it('should be able to delete a car', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '111.444.400-16',
      birth: '04/04/2000',
      email: 'ddddddddddd@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const userEmail = await response.body.email
    const userPassword = await response.body.password

    const userId = await response.body._id

    const user = await request.post(`/api/v1/user/login`).send({
      email: userEmail,
      password: userPassword,
    })

    const token = await user.body.token

    const car = await request
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'Hilux',
        color: 'Black 2.8',
        value_per_day: 30,
        year: '2020',
        accessories: [
          {
            description: 'aizaaaa',
          },
          {
            description: 'fodaaaaa',
          },
        ],
        number_of_passengers: 5,
      })

    const carId = await car.body._id

    const deletedCar = await request
      .delete(`/api/v1/car/${carId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deletedCar.statusCode).toBe(201)
    await request.delete(`/api/v1/user/${userId}`)
  })
})
