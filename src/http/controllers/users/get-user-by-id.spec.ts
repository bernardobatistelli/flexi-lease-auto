import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Get user by id (e2e)', () => {
  it('should be able to get an user by its id', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '000.000.100-16',
      birth: '04/04/2000',
      email: 'sasasasae123saas13oo@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const userId = await response.body._id

    const user = await request.get(`/api/v1/user/${userId}`)
    expect(user.body).toBeDefined()
    expect(user.body.name).toBe('Bezao')
    await request.delete(`/api/v1/user/${userId}`)
  })
})
