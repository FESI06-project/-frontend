export default function getDatePart(dateTimeString: string): string {
  if (!dateTimeString.includes('T')) {
    throw new Error('Invalid date-time format. "T" is missing.');
  }
  return dateTimeString.split('T')[0];
}
