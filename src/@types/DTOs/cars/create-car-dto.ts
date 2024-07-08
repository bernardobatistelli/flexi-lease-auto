export class CreateCarDto {
  readonly model: string
  readonly color: string
  readonly year: string
  readonly value_per_day: number
  readonly accessories: {
    description: string
  }[]

  readonly number_of_passengers: number
}
