import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import * as S from './styles'

import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

interface HeaderProps {
  goTo?: string | null
}

const Header = ({ goTo = null }: HeaderProps) => {
  return (
    <S.Header>
      <img src={Logo} alt="Ecoleta" />
      {goTo && (
        <Link to={goTo}>
          <FiArrowLeft />
          Voltar
        </Link>
      )}
    </S.Header>
  )
}

export default Header
