import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Login (e2e)', () => {
  it('should be able to login', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '001.707.100-00',
      birth: '04/04/2000',
      email: 'asdadsdsad@xample.com',
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

    expect(user.body.token).toBeDefined()
    await request.delete(`/api/v1/user/${userId}`)
  })
})
