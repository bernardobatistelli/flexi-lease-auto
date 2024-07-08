import { DataSource } from 'typeorm'
import { Car } from './entities/car'
import { User } from './entities/user'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://bebatistelli254:57YdGBS0SGjcbsdn@flexilease.r1fkdtg.mongodb.net/?retryWrites=true&w=majority&appName=flexilease',
  synchronize: true,
  entities: [Car, User],
  // username: 'bebatistelli254',
  // password: '57YdGBS0SGjcbsdn',
  // database: 'flexilease',
})
