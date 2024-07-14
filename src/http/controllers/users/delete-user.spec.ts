import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Delete user (e2e)', () => {
  beforeAll(async () => {})
  afterEach(() => {})
  it('should be able to delete an user', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '011.797.100-16',
      birth: '04/04/2000',
      email: 'beasasas13oo@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const userId = await response.body._id

    const deletedUser = await request.delete(`/api/v1/user/${userId}`)
    expect(deletedUser.statusCode).toEqual(201)
  })
})
