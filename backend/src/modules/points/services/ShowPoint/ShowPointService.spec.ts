import AppError from '@shared/errors/AppError'

import Faker from 'faker'
import FakePointRepository from '@modules/points/repositories/fakes/FakePointRepository'
import ShowPointService from './ShowPointService'
import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository'

let fakeItemsRepository: FakeItemsRepository
let fakePointRepository: FakePointRepository
let showPointService: ShowPointService

describe('ShowPoint', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository()
    fakePointRepository = new FakePointRepository()
    showPointService = new ShowPointService(fakePointRepository)
  })

  it('should be able to show a point', async () => {
    const item01 = await fakeItemsRepository.create({ title: 'Item01', image: 'item01.jpg' })
    const item02 = await fakeItemsRepository.create({ title: 'Item02', image: 'item02.jpg' })

    const itemArray = [
      { item_id: item01.item_id },
      { item_id: item02.item_id }
    ]

    await fakePointRepository.create({
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

    const { point_id } = await fakePointRepository.create({
      name: 'point test',
      email: Faker.internet.email(),
      whatsapp: Faker.phone.phoneNumber(),
      image: Faker.image.imageUrl(),
      latitude: 11.111111,
      longitude: 22.22222,
      city: Faker.address.city(),
      uf: Faker.address.countryCode(),
      items: itemArray
    })

    const getPoint = await showPointService.execute({ point_id })

    expect(getPoint).toEqual(
      expect.objectContaining({
        name: 'point test'
      })
    )
  })

  it('should not be able to show a non-existing point', async () => {
    await expect(
      showPointService.execute({ point_id: 'non-existing-id' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
