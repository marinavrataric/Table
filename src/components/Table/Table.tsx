import React, { ChangeEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import TableHeader from '../TableHeader/TableHeader'
import TableRow from '../TableRow/TableRow'
import { v4 as uuidv4 } from 'uuid'
import { validateValues } from '../validateValues'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
`
const Alert = styled.div<{ isValidationCorrect: boolean }>`
  font-size: 12px;
  padding: 4px;
  ${(props) =>
    props.isValidationCorrect &&
    css`
      display: none;
    `};
  ${(props) =>
    !props.isValidationCorrect &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      width: 370px;
      height: 20px;
      background-color: red;
      color: white;
      border-radius: 4px;
    `}
`
const AddButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: #36c736;
  color: white;
  width: 26px;
  height: 26px;
  margin-left: 10px;
`
const Button = styled.button`
  display: flex;
  padding: 6px 16px;
  border: none;
  background-color: #368dc7;
  color: white;
  border-radius: 4px;
`
const StyledTable = styled.table`
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  tr {
    display: flex;
    align-items: center;
    padding: 6px;

    &:nth-child(even) {
      background-color: #ecf8ff;
    }
    &:nth-child(odd) {
      background-color: #f9fcfd;
    }
  }
  th,
  td {
    padding: 0;
    display: flex;
    justify-content: left;
    width: 100%;

    &:nth-child(4) {
      justify-content: center;
    }
  }
  thead {
    tr {
      &:nth-child(1) {
        background-color: white;
      }
    }
  }
`

interface RowInterface {
  id: string
  type: string
  name: string
  description: string
  primary: boolean
}

const Table = () => {
  const [rowData, setRowData] = useState<RowInterface[]>([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isNameExisting, setIsNameExisting] = useState(false)
  const [isValidationCorrect, setIsValidationCorrect] = useState(true)
  const [validationMessages, setValidationMessages] = useState('')

  const editChanges = () => setIsEditOpen(true)

  const saveChanges = () => {
    const emptyNameDescription = rowData.filter(
      (item) => item.name === '' || item.description === ''
    )
    const checkedRow = rowData.filter((item) => item.primary)

    const errors = validateValues(
      isNameExisting,
      emptyNameDescription,
      checkedRow
    )

    if (errors.length !== 0) setIsValidationCorrect(false)
    else {
      setIsValidationCorrect(true)
      setIsEditOpen(false)
    }

    setValidationMessages(errors)
  }

  const addNewEmptyRow = () => {
    setRowData([
      ...rowData,
      {
        id: uuidv4(),
        type: 'string',
        name: '',
        description: '',
        primary: false,
      },
    ])
  }

  const handleInputType = (
    e: ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
    const updatedInputType = rowData.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, type: e.target.value }
      }
      return item
    })
    setRowData(updatedInputType)
  }

  const handleInputName = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const hasName = rowData.filter((item) => item.name === e.target.value)
    if (hasName.length !== 0) setIsNameExisting(true)
    else setIsNameExisting(false)

    const updatedInputType = rowData.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, name: e.target.value }
      }
      return item
    })
    setRowData(updatedInputType)
  }

  const handleInputDescription = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const updatedInputType = rowData.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, description: e.target.value }
      }
      return item
    })
    setRowData(updatedInputType)
  }

  const handleInputCheckbox = (rowIndex: number) => {
    const checkedRows = rowData.filter((item) => item.primary)

    const updatedCheckbox = rowData.map((item, index) => {
      if (index === rowIndex) {
        if (checkedRows.length === 0) return { ...item, primary: true }
        return { ...item, primary: false }
      }
      return item
    })
    setRowData(updatedCheckbox)
  }

  const deleteRow = (id: number) => {
    const updatedRows = rowData.filter((item, index) => index !== id)
    setRowData(updatedRows)
  }

  return (
    <Root>
      <ButtonWrapper>
        {!isEditOpen ? (
          <Button onClick={editChanges}>Edit</Button>
        ) : (
          <>
            <Alert isValidationCorrect={isValidationCorrect}>
              {validationMessages}
            </Alert>
            <Button onClick={saveChanges}>Save</Button>
            <AddButton onClick={addNewEmptyRow}>+</AddButton>
          </>
        )}
      </ButtonWrapper>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader />
          </tr>
        </thead>
        <tbody>
          {rowData.map((item, index) => (
            <TableRow
              key={index}
              type={item.type}
              name={item.name}
              description={item.description}
              primary={item.primary}
              isEditOpen={isEditOpen}
              handleInputType={(e: ChangeEvent<HTMLSelectElement>) =>
                handleInputType(e, index)
              }
              handleInputName={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputName(e, index)
              }
              handleInputDescription={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputDescription(e, index)
              }
              handleInputCheckbox={() => handleInputCheckbox(index)}
              deleteRowData={() => deleteRow(index)}
            />
          ))}
        </tbody>
      </StyledTable>
    </Root>
  )
}

export default Table
