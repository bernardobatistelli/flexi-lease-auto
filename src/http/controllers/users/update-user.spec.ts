import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
const request = supertest('http://localhost:3000')

describe('Update user (e2e)', () => {
  it('should be able to update an user', async () => {
    const response = await request.post('/api/v1/user').send({
      name: 'Bezao',
      cpf: '234.235.340-16',
      birth: '04/04/2000',
      email: 'eqweeeeeeeee@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
    })

    const userId = await response.body._id

    const updatedUser = await request.put(`/api/v1/user/${userId}`).send({
      name: 'Gabriel',
      cpf: '234.235.340-16',
      birth: '04/04/2000',
      email: 'eqweeeeeeeee@xample.com',
      password: '654321',
      cep: '99709-292',
      qualified: true,
      complement: 'N/A',
      locality: 'N/A',
      neighborhood: 'N/A',
      patio: 'N/A',
      uf: 'rs',
      id: { userId },
    })

    expect(updatedUser.body.name).toBe('Gabriel')
    await request.delete(`/api/v1/user/${userId}`)
  })
})
