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
  const [type, setType] = useState('string')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [rowData, setRowData] = useState<RowInterface[]>([])
  const [ID, setID] = useState<null | number>(null)
  const [isChecked, setIsChecked] = useState(false)

  const handleInputType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
  }
  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleInputDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
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
      setIsChecked(!updatedRowData[id].primary)
      updatedRowData[id].primary = !updatedRowData[id].primary
      setRowData(updatedRowData)
    } else {
      setIsChecked(false)
      updatedRowData[id].primary = false
      setRowData(updatedRowData)
      if (checkedItemID !== id) alert('You can select only one primary key.')
    }
  }

  const editChanges = () => {
    setIsEditOpen(true)
  }

  const saveChanges = () => {
    setIsEditOpen(false)
    // reset every value
    /*  setName('')
    setDescription('')
    setType('string') */
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

  const deleteRow = (id: string) => {
    const updatedRowData = rowData.filter((item) => item.id !== id)
    setRowData(updatedRowData)
  }

  const updateRow = (id: number) => {
    setID(id)
  }

  useEffect(() => {
    ID &&
      (rowData[ID] = {
        ...rowData[ID],
        type,
        name,
        description,
        primary: false,
      })
  }, [name, description, type, isChecked, ID])

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
                handleInputType(e)
              }
              handleInputName={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputName(e)
              }
              handleInputDescription={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputDescription(e)
              }
              handleInputCheckbox={() => handleInputCheckbox(index)}
              deleteRowData={() => deleteRow(item.id)}
              updateRow={() => updateRow(index)}
            />
          ))}
        </tbody>
      </StyledTable>
    </Root>
  )
}

export default Table
