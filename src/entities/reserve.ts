import { ObjectId } from 'mongodb'
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm'
import { Car } from './car'
import { User } from './user'

@Entity()
export class Reserve {
  @ObjectIdColumn()
  _id: ObjectId

  @Column({
    type: 'string',
  })
  start_date: string

  @Column({
    type: 'string',
  })
  end_date: string

  @Column({
    type: 'number',
  })
  final_value: number

  @Column({
    type: 'number',
  })
  number_of_passengers: number

  @Column({
    type: 'string',
  })
  car_id: string

  @Column({
    type: 'string',
  })
  user_id: string

  @ManyToOne(() => User, (user) => user.reserves)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Car, (car) => car.reserves)
  @JoinColumn({ name: 'car_id' })
  car: Car
}
