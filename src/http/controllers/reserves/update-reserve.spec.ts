import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Update reserve (e2e)', () => {
  it('should be able to update a reserve', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '222.111.333-16',
      birth: '04/04/2000',
      email: 'awawawaw@xample.com',
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
        model: 'Siena',
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

    const carId = await car.body._id
    const reserve = await request
      .post('/api/v1/reserve')
      .set('Authorization', `Bearer ${token}`)
      .send({
        start_date: '20/04/2023',
        end_date: '30/04/2023',
        car_id: `${carId}`,
      })

    const reserveId = await reserve.body._id

    const getReserve = await request
      .get(`/api/v1/reserve/${reserveId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getReserve.body.start_date).toBe('20/04/2023')

    const updatedReserve = await request
      .put(`/api/v1/reserve/${reserveId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        start_date: '25/05/2023',
        end_date: '30/05/2023',
        id_car: `${carId}`,
        id_user: '21313213',
        final_value: '250',
      })

    expect(updatedReserve.body.start_date).toBe('25/05/2023')
    await request
      .delete(`/api/v1/car/${carId}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/v1/reserve/${reserveId}`)
      .set('Authorization', `Bearer ${token}`)
  })
})
