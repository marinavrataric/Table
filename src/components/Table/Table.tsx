import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import TableHeader from '../TableHeader/TableHeader'
import TableRow from '../TableRow/TableRow'
import { v4 as uuidv4 } from 'uuid'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
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
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [rowData, setRowData] = useState<RowInterface[]>([])

  const handleInputType = (
    e: ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
    const newRow = rowData.map((item, index) => {
      if (index !== rowIndex) {
        return item
      } else {
        return { ...item, type: e.target.value }
      }
    })
    setRowData(newRow)
  }
  const handleInputName = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const newRows = rowData.map((item, index) => {
      if (index !== rowIndex) {
        return item
      }
      return { ...item, name: e.target.value }
    })
    setRowData(newRows)
  }
  const handleInputDescription = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const newRows = rowData.map((item, index) => {
      if (index !== rowIndex) {
        return item
      } else {
        return { ...item, description: e.target.value }
      }
    })
    setRowData(newRows)
  }
  const handleInputCheckbox = (id: number) => {
    const updatedRowData = [...rowData]
    const checkedItem = rowData.filter((item) => item.primary)

    const itemIDs = rowData.map((item, index) => {
      if (item.primary) return index
      return null
    })

    const [checkedItemID] = itemIDs.filter((item) => item)

    if (checkedItem.length === 0) {
      updatedRowData[id].primary = !updatedRowData[id].primary
      setRowData(updatedRowData)
    } else {
      updatedRowData[id].primary = false
      setRowData(updatedRowData)
      if (checkedItemID !== id) alert('You can select only one primary key.')
    }
  }

  const editChanges = () => {
    setIsEditOpen(true)
  }

  const saveChanges = () => {
    const isEmptyRow = rowData.filter((item) => !item.name || !item.description)
    const isPrimarySelected = rowData.filter((item) => item.primary)

    if (isEmptyRow.length !== 0) {
      alert('Fields cannot be empty')
    }
    if (isPrimarySelected.length === 0) {
      alert('Must have at least one primary key')
    }
    if (isEmptyRow.length === 0 && isPrimarySelected.length !== 0) {
      setIsEditOpen(false)
    }
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

  const deleteRow = (id: number) => {
    const updatedRowData = rowData.filter((item, index) => index !== id)
    setRowData(updatedRowData)
  }

  return (
    <Root>
      <ButtonWrapper>
        {!isEditOpen && <Button onClick={editChanges}>Edit</Button>}
        {isEditOpen && (
          <>
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
