import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm'
import { Reserve } from './reserve'

@Entity()
export class Car {
  @ObjectIdColumn()
  _id: ObjectId

  @Column({
    type: 'string',
  })
  model: string

  @Column({
    type: 'string',
  })
  color: string

  @Column({
    type: 'string',
  })
  year: string

  @Column({
    type: 'number',
  })
  value_per_day: number

  @Column({
    type: 'nvarchar',
  })
  accessories: {
    description: string
  }[]

  @Column({
    type: 'number',
  })
  number_of_passengers: number

  @OneToMany(() => Reserve, (reserve) => reserve.car, { onDelete: 'CASCADE' })
  reserves: Reserve[]
}
