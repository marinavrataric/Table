import React, { ChangeEvent, FunctionComponent } from 'react'
import styled from 'styled-components'

const Row = styled.tr`
  border-bottom: 1px solid #e7e7e7;
`
const Column = styled.td``
const TextType = styled.p`
  color: #919191;
  font-weight: 300;
  padding-left: 20px;
`
const TextName = styled.p`
  color: #343435;
  font-weight: 700;
`
const InputText = styled.input`
  border: none;
  background-color: transparent;
`
const DeleteButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  margin-left: 50px;
`
const TextDescription = styled.p`
  color: #343435;
  font-weight: 300;
`
const Checkbox = styled.input``

interface Props {
  type: string
  name: string
  description: string
  primary: boolean
  isEditOpen: boolean
  handleInputName: (e: ChangeEvent<HTMLInputElement>) => void
  handleInputDescription: (e: ChangeEvent<HTMLInputElement>) => void
  handleInputType: (e: ChangeEvent<HTMLSelectElement>) => void
  handleInputCheckbox: (e: ChangeEvent<HTMLInputElement>) => void
  deleteRowData: () => void
  updateRow: () => void
}

const TableRow: FunctionComponent<Props> = ({
  type,
  name,
  description,
  primary,
  isEditOpen,
  handleInputName,
  handleInputDescription,
  handleInputType,
  handleInputCheckbox,
  deleteRowData,
  updateRow,
}) => {
  if (isEditOpen)
    return (
      <Row onClick={updateRow}>
        <Column>
          <select onChange={handleInputType} defaultValue={type}>
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="array">array</option>
          </select>
        </Column>
        <Column>
          <InputText
            type="text"
            defaultValue={name}
            onChange={handleInputName}
          />
        </Column>
        <Column>
          <InputText
            type="text"
            defaultValue={description}
            onChange={handleInputDescription}
          />
        </Column>
        <Column>
          <Checkbox
            type="checkbox"
            checked={primary}
            onChange={handleInputCheckbox}
          />
          <DeleteButton onClick={deleteRowData}>x</DeleteButton>
        </Column>
      </Row>
    )
  return (
    <Row>
      <Column>
        <TextType>{type}</TextType>
      </Column>
      <Column>
        <TextName>{name}</TextName>
      </Column>
      <Column>
        <TextDescription>{description}</TextDescription>
      </Column>
      <Column>{primary ? '✅' : '❌'}</Column>
    </Row>
  )
}

export default TableRow
