export class UnauthorizedError extends Error {
  constructor() {
    super('You must be qualified to create a reserve.')
  }
}
