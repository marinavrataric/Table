import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  color: #343435;
  font-weight: 700;
`

const TableHeader = () => {
  const tableHeaderKeys = Object.keys({
    type: '',
    name: '',
    description: '',
    primary: false,
  })

  const capitalizeTableHeaderKeys = tableHeaderKeys.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1, item.length)
  )

  return (
    <>
      {capitalizeTableHeaderKeys.map((item, index) => (
        <th key={index}>
          <Text>{item}</Text>
        </th>
      ))}
    </>
  )
}

export default TableHeader
