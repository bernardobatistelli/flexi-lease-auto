import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm'

@Entity()
@Unique(['cpf'])
export class User {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  name: string

  @Column()
  cpf: string

  @Column()
  birth: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'cpf' })
  cep: string

  @Column()
  qualified: boolean

  @Column()
  logradouro: string

  @Column()
  complement: string

  @Column()
  neighborhood: string

  @Column()
  locality: string

  @Column()
  uf: string
}