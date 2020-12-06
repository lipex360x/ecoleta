import Faker from 'faker'

import FakePointRepository from '@modules/points/repositories/fakes/FakePointRepository'
import ListPointsService from './ListPointsService'
import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository'
import AppError from '@shared/errors/AppError'

let fakeItemsRepository: FakeItemsRepository
let fakePointRepository: FakePointRepository
let listPointsService: ListPointsService

describe('ListPoints', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository()
    fakePointRepository = new FakePointRepository()
    listPointsService = new ListPointsService(fakePointRepository)
  })

  it('should be able to list a list of filtered points', async () => {
    const item01 = await fakeItemsRepository.create({ title: 'Item01', image: 'item01.jpg' })
    const item02 = await fakeItemsRepository.create({ title: 'Item02', image: 'item02.jpg' })
    const item03 = await fakeItemsRepository.create({ title: 'Item03', image: 'item03.jpg' })
    const item04 = await fakeItemsRepository.create({ title: 'Item04', image: 'item04.jpg' })
    const item05 = await fakeItemsRepository.create({ title: 'Item05', image: 'item05.jpg' })

    const itemArray1 = [
      { item_id: item01.item_id, title: item01.title },
      { item_id: item02.item_id, title: item02.title }
    ]

    const itemArray2 = [
      { item_id: item03.item_id, title: item03.title }
    ]

    const itemArray3 = [
      { item_id: item04.item_id, title: item04.title },
      { item_id: item05.item_id, title: item05.title }
    ]

    await fakePointRepository.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      whatsapp: Faker.phone.phoneNumber(),
      image: Faker.image.imageUrl(),
      latitude: 11.111111,
      longitude: 22.22222,
      city: 'São Paulo',
      uf: 'SP',
      items: itemArray1
    })

    await fakePointRepository.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      whatsapp: Faker.phone.phoneNumber(),
      image: Faker.image.imageUrl(),
      latitude: 11.111111,
      longitude: 22.22222,
      city: 'Belo Horizonte',
      uf: 'MG',
      items: itemArray2
    })

    await fakePointRepository.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      whatsapp: Faker.phone.phoneNumber(),
      image: Faker.image.imageUrl(),
      latitude: 11.111111,
      longitude: 22.22222,
      city: 'Belo Horizonte',
      uf: 'MG',
      items: itemArray3
    })

    const city = 'Belo Horizonte'
    const uf = 'MG'
    const items = [item03.item_id]

    const getPoint = await listPointsService.execute({ city, uf, items })

    expect(getPoint).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          point_items: expect.arrayContaining([
            expect.objectContaining({
              title: 'Item03'
            })
          ])
        })
      ])
    )
  })

  it('should not be able to list a non-existing point filtered', async () => {
    const item01 = await fakeItemsRepository.create({ title: 'Item01', image: 'item01.jpg' })

    const city = 'Belo Horizonte'
    const uf = 'MG'
    const items = [item01.item_id]

    await expect(listPointsService.execute({ city, uf, items })).rejects.toBeInstanceOf(AppError)
  })
})
