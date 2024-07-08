import { DataSource } from 'typeorm'
import { Car } from './entities/car'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://bebatistelli254:57YdGBS0SGjcbsdn@flexilease.r1fkdtg.mongodb.net/?retryWrites=true&w=majority&appName=flexilease',
  synchronize: true,
  entities: [Car],
  // username: 'bebatistelli254',
  // password: '57YdGBS0SGjcbsdn',
  // database: 'flexilease',
})
