import AppError from '@shared/errors/AppError'

import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository'
import CreateItemService from './CreateItemService'

let fakeRepository: FakeItemsRepository
let createItemService: CreateItemService

describe('CreateItem', () => {
  beforeEach(() => {
    fakeRepository = new FakeItemsRepository()
    createItemService = new CreateItemService(fakeRepository)
  })

  it('should be able to create a new item', async () => {
    const item = await createItemService.execute({
      title: 'Item01',
      image: 'item01.jpg'
    })

    expect(item).toHaveProperty('item_id')
  })

  it('should not be able to create a duplicated item', async () => {
    await fakeRepository.create({ title: 'item01', image: 'imagem01.jpg' })

    await expect(
      createItemService.execute({
        title: 'item01',
        image: 'item01.jpg'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
