import { DataSource } from 'typeorm'
import { Car } from './entities/car'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  logging: 'all',
  synchronize: true,
  entities: [Car],
  // username: 'bebatistelli254',
  // password: '57YdGBS0SGjcbsdn',
  // database: 'flexilease',
})
