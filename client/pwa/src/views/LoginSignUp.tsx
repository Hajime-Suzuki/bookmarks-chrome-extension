import LoginOrSignUp from '@bookmarks/extension/src/app/view/Login'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'

const Wrapper = styled.div`
  box-sizing: border-box;
  min-height: 95vh;
  overflow-x: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LoginSignUp = (props: RouteComponentProps) => {
  return (
    <Wrapper>
      <LoginOrSignUp
        onLogin={() => {
          props.history.push('/')
        }}
      />
    </Wrapper>
  )
}

export default LoginSignUp
