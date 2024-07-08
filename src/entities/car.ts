import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

type Accessories = {
  description: string
}

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  model: string

  @Column()
  color: string

  @Column()
  year: string

  @Column()
  value_per_day: number

  @Column()
  accessories: Accessories[]

  @Column()
  number_of_passengers: number
}
