import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm'

type Accessories = {
  description: string
}

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string

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
  accessories: Accessories[]

  @Column()
  number_of_passengers: number
}
