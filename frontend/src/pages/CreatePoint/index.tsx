import React from 'react'
import * as S from './styles'

import Header from '../../components/Header'

const CreatePoint = () => {
  return (
    <S.Section>
      <Header goTo={'/'} />

      <S.Form>
        <h1>Cadostro do <br /> Ponto de Coleta</h1>
        <S.Fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <S.Field>
            <label htmlFor="name">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </S.Field >

          <S.FieldGroup>

          <S.Field>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
            />
          </S.Field >

          <S.Field>
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
            />
          </S.Field >
          </S.FieldGroup>

        </S.Fieldset>

        <S.Fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o Endereço no Mapa</span>
          </legend>

          <S.FieldGroup>
            <S.Field>
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </S.Field>

            <S.Field>
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma Cidade</option>
              </select>
            </S.Field>
          </S.FieldGroup>
        </S.Fieldset>

        <S.Fieldset>
          <legend>
            <h2>Itens de Coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <S.List>
            <li className="selected">
              <img src="http://localhost:3333/uploads/baterias.svg" alt=""/>
              <span>Bateria</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt=""/>
              <span>Bateria</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt=""/>
              <span>Bateria</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt=""/>
              <span>Bateria</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt=""/>
              <span>Bateria</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt=""/>
              <span>Bateria</span>
            </li>
          </S.List>

        </S.Fieldset>

        <button type="submit">Cadastrar Ponto de Coleta</button>
      </S.Form>

    </S.Section>
  )
}

export default CreatePoint
