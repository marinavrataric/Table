export const validateValues = (
  isNameExisting: boolean,
  emptyNameDescription: Array<{}>,
  checkedRow: Array<{}>
) => {
  let validationMessage: string[] = []

  if (isNameExisting) validationMessage.push('name must be unique')
  if (emptyNameDescription.length !== 0)
    validationMessage.push('no empty fields')
  if (checkedRow.length === 0)
    validationMessage.push('one item must be checked')

  const joinedValidationMessages = validationMessage.join(', ')

  return joinedValidationMessages
}
