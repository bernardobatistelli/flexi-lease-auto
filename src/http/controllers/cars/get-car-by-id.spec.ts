import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Get car by id (e2e)', () => {
  it('should be able to get a car by its id', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '111.555.400-16',
      birth: '04/04/2000',
      email: 'rrrrrrrr@xample.com',
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
        model: 'Elantra',
        color: 'Green',
        value_per_day: 30,
        year: '2022',
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

    const finalCar = await request
      .get(`/api/v1/car/${carId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(finalCar.body.model).toBe('Elantra')
    await request.delete(`/api/v1/user/${userId}`)
  })
})
