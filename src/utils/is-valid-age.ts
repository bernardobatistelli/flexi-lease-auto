import { parseISO, differenceInYears, isValid } from 'date-fns'
import { InvalidBirthFormat } from '../use-cases/errors/invalid-birth'
import { UnderageError } from '../use-cases/errors/underage'

export const isValidAge = (birthDateString: string): boolean => {
  const birthDate = parseISO(birthDateString)

  if (!isValid(birthDate)) {
    throw new InvalidBirthFormat()
  }

  const age = differenceInYears(new Date(), birthDate)

  if (age < 18) {
    throw new UnderageError()
  }

  return true
}
