// import AppError from '@shared/errors/AppError'

import Faker from 'faker'
import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository'
import FakePointRepository from '@modules/points/repositories/fakes/FakePointRepository'
import CreatePointService from './CreatePointService'

let fakeItemsRepository: FakeItemsRepository
let fakePointRepository: FakePointRepository
let createPointService: CreatePointService

describe('TEST_NAME', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository()
    fakePointRepository = new FakePointRepository()
    createPointService = new CreatePointService(fakePointRepository, fakeItemsRepository)
  })

  it('should be able to create a Point', async () => {
    const item01 = await fakeItemsRepository.create({ title: 'Item01', image: 'item01.jpg' })
    const item02 = await fakeItemsRepository.create({ title: 'Item02', image: 'item02.jpg' })

    const itemArray = [
      { item_id: item01.item_id },
      { item_id: item02.item_id }
    ]

    const point = await createPointService.execute({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      whatsapp: Faker.phone.phoneNumber(),
      image: Faker.image.imageUrl(),
      latitude: 11.111111,
      longitude: 22.22222,
      city: Faker.address.city(),
      uf: Faker.address.countryCode(),
      items: itemArray
    })

    expect(point).toHaveProperty('point_id')

    expect(point).toEqual(
      expect.objectContaining({
        point_items: expect.arrayContaining([
          expect.objectContaining({
            title: 'Item01'
          })
        ])
      })
    )
  })
})
