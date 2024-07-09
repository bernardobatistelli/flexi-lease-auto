import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm'
import { Reserve } from './reserve'

@Entity()
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

  @Column()
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

  @OneToMany(() => Reserve, (reserve) => reserve.user, {
    onDelete: 'CASCADE',
  })
  reserves: Reserve[]
}
