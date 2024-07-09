import { differenceInDays, isValid, parse } from 'date-fns'

function isValidDateFormat(dateString: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  return regex.test(dateString)
}

export function calculateDaysBetweenDates(
  startDateString: string,
  endDateString: string,
): number {
  if (
    !isValidDateFormat(startDateString) ||
    !isValidDateFormat(endDateString)
  ) {
    throw new Error('Formato de data inválido. Use "dd/MM/yyyy".')
  }

  const startDate = parse(startDateString, 'dd/MM/yyyy', new Date())
  const endDate = parse(endDateString, 'dd/MM/yyyy', new Date())

  if (!isValid(startDate) || !isValid(endDate)) {
    throw new Error('Data inválida.')
  }

  const intervalInDays = differenceInDays(endDate, startDate)

  return intervalInDays
}
