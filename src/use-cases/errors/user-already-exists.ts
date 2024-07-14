export class UserAlreadyExistsError extends Error {
  constructor() {
    super('This user already exists. The cpf and the email must be unique.')
  }
}
