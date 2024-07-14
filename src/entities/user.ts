import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm'
import { Reserve } from './reserve'

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId

  @Column({
    type: 'string',
  })
  name: string

  @Column({
    type: 'string',
  })
  cpf: string

  @Column({
    type: 'string',
  })
  birth: string

  @Column({
    type: 'string',
  })
  email: string

  @Column({
    type: 'string',
  })
  password: string

  @Column({
    type: 'string',
  })
  cep: string

  @Column({
    type: 'boolean',
  })
  qualified: boolean

  @Column({
    type: 'string',
  })
  logradouro: string

  @Column({
    type: 'string',
  })
  complement: string

  @Column({
    type: 'string',
  })
  neighborhood: string

  @Column({
    type: 'string',
  })
  locality: string

  @Column({
    type: 'string',
  })
  uf: string

  @OneToMany(() => Reserve, (reserve) => reserve.user, {
    onDelete: 'CASCADE',
  })
  reserves: Reserve[]
}
