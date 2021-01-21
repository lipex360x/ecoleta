import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import * as S from './styles'
import axios from 'axios'

import api from '../../services/api'

import Header from '../../components/Header'
import Dropzone from '../../components/Dropzone'

interface ItemsProps {
  item_id: string
  image_url: string
  title: string
}

interface IBGEUFResponse {
  sigla: string
}
interface IBGECityResponse {
  nome: string
}

const CreatePoint = () => {
  const [items, setItems] = useState<ItemsProps[]>([])

  const [ufs, setUfs] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')

  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState('0')

  const [initialPosition, setInitialPosition] = useState<[number, number]>([-19.8360631, -43.9154301])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  const [selectedFile, setSelectedFile] = useState<File>()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })

  const [selectdItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    (async function () {
      const { data } = await api.get('/items')
      setItems(data)
    })()
  }, [])

  useEffect(() => {
    (async function () {
      const { data } = await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      const ufInitials = data.map(uf => uf.sigla).sort()
      setUfs(ufInitials)
    })()
  }, [])

  useEffect(() => {
    (async function () {
      if (selectedUf !== '0') {
        const { data } = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        const cityName = data.map(city => city.nome).sort()
        setCities(cityName)
      }
    })()
  }, [selectedUf])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
    })
  }, [])

  function handleSelectUf (event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUf(uf)
  }

  function handleSelectCity (event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCity(city)
  }

  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function HandleMapEvent () {
    useMapEvent('click', (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng
      setSelectedPosition([lat, lng])
    })

    return null
  }

  function handleSelectItem (item_id: string) {
    const alreadSelected = selectdItems.findIndex(item => item === item_id)
    if (alreadSelected >= 0) {
      const filteredItems = selectdItems.filter(item => item !== item_id)
      setSelectedItems(filteredItems)
      return
    }
    setSelectedItems([...selectdItems, item_id])
  }

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()

    console.log(selectedFile)

    const { name, email, whatsapp } = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const items = selectdItems.join(',')
    const data = new FormData()

    data.append('name', name)
    data.append('email', email)
    data.append('whatsapp', whatsapp)
    data.append('uf', uf)
    data.append('city', city)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('items', items)
    if (selectedFile) data.append('image', selectedFile)

    try {
      const response = await api.post('/points', data)
      console.log(data, response)
      alert('Ponto Criado')
    } catch (error) {
      const { message } = error.response.data.validation.body
      console.log(error.response.data, message)
    }
  }

  return (
    <S.Section>
      <Header goTo={'/'} />

      <S.Form onSubmit={handleSubmit}>
        <h1>Cadastro de Ponto de Coleta</h1>
        <Dropzone onFileUploaded={setSelectedFile}/>

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
              onChange={handleInputChange}
            />
          </S.Field >

          <S.FieldGroup>

            <S.Field>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </S.Field >

            <S.Field>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </S.Field >
          </S.FieldGroup>

        </S.Fieldset>

        <S.Fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço clicando no Mapa</span>
          </legend>

          <MapContainer
            center={initialPosition}
            zoom={15}
            scrollWheelZoom={false}
            className="leaflet"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
            <HandleMapEvent />
          </MapContainer>

          <S.FieldGroup>
            <S.Field>
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>

                {ufs && ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}

              </select>
            </S.Field>

            <S.Field>
              <label htmlFor="city">Cidade</label>
              <select
                value={selectedCity}
                onChange={handleSelectCity}
                name="city"
                id="city"
              >
                <option value="0">Selecione uma Cidade</option>

                {cities && cities.map(city => (
                  <option
                    key={city} value={city}>{city}</option>
                ))}

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
            {items && items.map(item => (
              <li
                key={item.item_id}
                onClick={() => handleSelectItem(item.item_id)}
                className={selectdItems.includes(item.item_id) ? 'selected' : ''}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </S.List>

        </S.Fieldset>

        <button type="submit">Cadastrar Ponto de Coleta</button>
      </S.Form>

    </S.Section>
  )
}

export default CreatePoint
