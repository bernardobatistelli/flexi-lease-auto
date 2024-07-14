import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Register user (e2e)', () => {
  it('should be able to register', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '000.797.100-16',
      birth: '04/04/2000',
      email: 'beoo@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const userId = await response.body._id

    await request.delete(`/api/v1/user/${userId}`)
    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register without a name', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '000.097.100-16',
      birth: '04/04/2000',
      email: 'bezoo@xample.com',
      password: undefined,
      cep: '99709-292',
      qualified: true,
    })

    expect(response.statusCode).toEqual(400)
  })
})
