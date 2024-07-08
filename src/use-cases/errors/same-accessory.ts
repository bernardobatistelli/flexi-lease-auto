export class SameAccessoryError extends Error {
  constructor() {
    super('You cannot have two accessories with the same description')
  }
}
