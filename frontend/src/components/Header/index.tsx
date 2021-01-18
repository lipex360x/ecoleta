import React, { useState } from 'react'
import * as S from './styles'

import Logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <S.Section>
      <img src={Logo} alt="Ecoleta"/>
    </S.Section>
  )
}

export default Header
