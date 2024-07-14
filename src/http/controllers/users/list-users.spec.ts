import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('List users (e2e)', () => {
  it('should be able to list users', async () => {
    const user1 = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '110.797.100-16',
      birth: '04/04/2000',
      email: 'be123saas13oo@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const user1Id = await user1.body._id

    const user2 = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '111.797.100-16',
      birth: '04/04/2000',
      email: 'asas123saas13oo@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const user2Id = await user2.body._id

    const users = await request.get('/api/v1/user/')

    expect(users).toBeDefined()
    expect(users.body.length).toBeGreaterThanOrEqual(2)
    await request.delete(`/api/v1/user/${user1Id}`)
    await request.delete(`/api/v1/user/${user2Id}`)
  })
})
