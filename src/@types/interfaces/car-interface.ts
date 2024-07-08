export interface ICar {
  id: number
  model: string
  color: string
  year: string
  value_per_day: number
  accessories: {
    description: string
  }[]
  number_of_passengers: number
}
