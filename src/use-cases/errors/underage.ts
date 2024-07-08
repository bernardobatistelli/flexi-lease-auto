export class UnderageError extends Error {
  constructor() {
    super('You must be 18 years old or older to register.')
  }
}
