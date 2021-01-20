import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as S from './styles'

import Header from '../../components/Header'

const Home = () => {
  return (
    <S.Section>
      <S.Content>
        <Header />

        <S.Main>
          <h1>Seu Marketplace de coleta de resíduos</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

          <Link to="/create-point">
            <span><FiLogIn /></span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>

        </S.Main>

      </S.Content>

    </S.Section>
  )
}

export default Home
