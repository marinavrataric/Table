import React, { ChangeEvent, FunctionComponent } from 'react'
import styled, { css } from 'styled-components'

const Row = styled.tr`
  border-bottom: 1px solid #e7e7e7;
  height: 50px;
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
const InputText = styled.input<{ isName: boolean }>`
  border: none;
  background-color: transparent;
  font-size: 14px;

  ${(props) =>
    props.isName &&
    css`
      color: #343435;
      font-weight: 700;
    `};
  ${(props) =>
    !props.isName &&
    css`
      color: #343435;
      font-weight: 300;
    `}
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
  handleInputCheckbox: () => void
  deleteRowData: () => void
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
}) => {
  const typeOptions = ['string', 'number', 'array']

  if (isEditOpen)
    return (
      <Row>
        <Column>
          <select onChange={handleInputType} defaultValue={type}>
            {typeOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Column>
        <Column>
          <InputText
            type="text"
            defaultValue={name}
            onChange={handleInputName}
            isName={true}
          />
        </Column>
        <Column>
          <InputText
            type="text"
            defaultValue={description}
            onChange={handleInputDescription}
            isName={false}
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
