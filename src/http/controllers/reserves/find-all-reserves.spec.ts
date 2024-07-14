import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Get reserves (e2e)', () => {
  beforeAll(() => {})
  afterEach(() => {})
  it('should be able to get all reserves', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '999.111.100-16',
      birth: '04/04/2000',
      email: 'yyyyyyyy@xample.com',
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

    const car1 = await request
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'Palio',
        color: 'Prata',
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
        model: 'Punto',
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

    const car2Id = await car2.body._id

    const reserve1 = await request
      .post('/api/v1/reserve')
      .set('Authorization', `Bearer ${token}`)
      .send({
        start_date: '20/04/2023',
        end_date: '30/04/2023',
        car_id: `${car1Id}`,
      })

    const reserve1Id = await reserve1.body._id

    expect(reserve1.body).toBeDefined()

    const reserve2 = await request
      .post('/api/v1/reserve')
      .set('Authorization', `Bearer ${token}`)
      .send({
        start_date: '20/04/2023',
        end_date: '30/04/2023',
        car_id: `${car2Id}`,
      })

    const reserve2Id = await reserve2.body._id

    expect(reserve2.body).toBeDefined()

    const reserves = await request
      .get('/api/v1/reserve')
      .set('Authorization', `Bearer ${token}`)

    expect(reserves.body.reserve.length).toBeGreaterThanOrEqual(2)

    await request
      .delete(`/api/v1/car/${car1Id}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/car/${car2Id}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/reserve/${reserve1Id}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/reserve/${reserve2Id}`)
      .set('Authorization', `Bearer ${token}`)
  })
})
