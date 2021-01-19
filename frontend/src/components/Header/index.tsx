import React, { useState } from 'react'
import * as S from './styles'

import Logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <S.Header>
      <img src={Logo} alt="Ecoleta"/>
    </S.Header>
  )
}

export default Header
