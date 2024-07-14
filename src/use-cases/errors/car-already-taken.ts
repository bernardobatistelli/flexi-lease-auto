export class CarAlreadyTakenError extends Error {
  constructor() {
    super(
      'This car is already taken for this date. Choose another car or change the date',
    )
  }
}
