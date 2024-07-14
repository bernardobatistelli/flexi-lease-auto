import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Update accessory (e2e)', () => {
  it('should be able to update a car accessory', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '333.333.222-16',
      birth: '04/04/2000',
      email: 'fffffff@xample.com',
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
        model: 'Golzinho',
        color: 'Branco',
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
    expect(car.body.model).toBe('Golzinho')
    expect(car.body.color).toBe('Branco')

    const updatedCar = await request
      .put(`/api/v1/car/${carId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'Golf GTI',
        color: 'Preto',
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

    expect(updatedCar.body.model).toBe('Golf GTI')
    expect(updatedCar.body.color).toBe('Preto')

    await request
      .delete(`/api/v1/car/${carId}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
  })
})
