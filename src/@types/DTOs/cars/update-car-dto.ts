export class UpdateCarDto {
  readonly id: string | undefined
  readonly model: string | undefined
  readonly color: string | undefined
  readonly year: string | undefined
  readonly value_per_day: number | undefined
  readonly accessories: {
    description: string | undefined
  }[]

  readonly number_of_passengers: number | undefined
}
