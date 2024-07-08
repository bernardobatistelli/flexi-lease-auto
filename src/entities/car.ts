import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm'

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
  accessories: { description: string }[]

  @Column()
  number_of_passengers: number
}
