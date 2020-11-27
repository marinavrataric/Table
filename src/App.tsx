import React from 'react'
import styled from 'styled-components'
import Table from './components/Table/Table'

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  background-color: #f0e5e5;
  justify-content: center;
  font-size: 14px;
`

const App = () => {
  return (
    <Root>
      <Table />
    </Root>
  )
}

export default App
