import { DataSource } from 'typeorm'
import { Car } from './entities/car'
import { User } from './entities/user'
import { Reserve } from './entities/reserve'
import 'reflect-metadata'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  logging: 'all',
  synchronize: true,
  entities: [Car, User, Reserve],
  // username: 'bebatistelli254',
  // password: '57YdGBS0SGjcbsdn',
  // database: 'flexilease',
})
