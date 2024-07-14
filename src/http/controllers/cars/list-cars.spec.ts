import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('List cars (e2e)', () => {
  beforeAll(() => {})
  afterEach(() => {})
  it('should be able to list cars', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '111.666.400-16',
      birth: '04/04/2000',
      email: 'bbbbbbbbbbbb@xample.com',
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

    await request.delete(`/api/v1/user/${userId}`)

    const car1 = await request
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'Corolla',
        color: 'Silver',
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

    const car1Id = await car1.body._id

    const car2 = await request
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'Astra',
        color: 'White 2.8',
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

    const car2Id = await car2.body._id

    const cars = await request
      .get('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)

    expect(cars.body.car).toBeDefined()

    await request
      .delete(`/api/v1/car/${car1Id}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/car/${car2Id}`)
      .set('Authorization', `Bearer ${token}`)
  })
})
