import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['cpf'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

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
  patio: string

  @Column()
  complement: string

  @Column()
  neighborhood: string

  @Column()
  locality: string

  @Column()
  uf: string
}
