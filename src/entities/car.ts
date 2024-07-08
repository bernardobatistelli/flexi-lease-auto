import { ObjectId } from 'mongodb'
import { Column, Entity, Generated, ObjectIdColumn } from 'typeorm'

@Entity()
export class Car {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  model: string

  @Column()
  color: string

  @Column()
  year: string

  @Column()
  value_per_day: number

  @Column()
  @Generated('rowid')
  accessories: { description: string }[]

  @Column()
  number_of_passengers: number
}
