export class ReserveOnSameDayError extends Error {
  constructor() {
    super(
      'There already is a reserve in this interval of time. Please change the date',
    )
  }
}
