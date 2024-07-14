import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Update accessory (e2e)', () => {
  beforeAll(() => {})
  afterEach(() => {})
  it('should be able to update a car accessory', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '333.333.333-16',
      birth: '04/04/2000',
      email: 'wwwwwwww@xample.com',
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
        model: 'Golfao',
        color: 'Cromado',
        year_per_day: 50,
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

    expect(car.body).toBeDefined()
    expect(car.body.accessories[0].description).toBe('aizaaaa')

    const updatedCar = await request
      .patch(`/api/v1/car/${carId}/accessories/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'updated description',
      })

    expect(updatedCar.body.car.accessories[0].description).toBe(
      'updated description',
    )

    await request
      .delete(`/api/v1/car/${carId}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
  })
})
