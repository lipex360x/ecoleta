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
            <label htmlFor="">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </S.Field >

          <S.FieldGroup>

          <S.Field>
            <label htmlFor="">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </S.Field >

          <S.Field>
            <label htmlFor="">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </S.Field >
          </S.FieldGroup>

        </S.Fieldset>

        <S.Fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>
        </S.Fieldset>

        <S.Fieldset>
          <legend>
            <h2>Itens de Coleta</h2>
          </legend>
        </S.Fieldset>

      </S.Form>

    </S.Section>
  )
}

export default CreatePoint
