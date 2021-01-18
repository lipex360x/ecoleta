import styled from 'styled-components'
import { shade } from 'polished'

import Background from '../../assets/home-background.svg'

export const Section = styled.section`
  height: 100vh;
  background: url(${Background}) no-repeat 600px bottom;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
