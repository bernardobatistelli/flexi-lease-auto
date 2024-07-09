import { ObjectId } from 'mongodb'
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm'
import { Car } from './car'
import { User } from './user'

@Entity()
export class Reserve {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  @Column()
  final_value: number

  @Column()
  number_of_passengers: number

  @ManyToOne(() => User, (user) => user.reserves)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Car, (car) => car.reserves)
  @JoinColumn({ name: 'car_id' })
  car: Car
}
