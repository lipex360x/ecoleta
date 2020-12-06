// import AppError from '@shared/errors/AppError'
import FakeItemsRepository from '@modules/items/repositories/fakes/FakeItemsRepository'
import ListItemsService from './ListItemsService'

let fakeRepository: FakeItemsRepository
let listItemsService: ListItemsService

describe('ListItems', () => {
  beforeEach(() => {
    fakeRepository = new FakeItemsRepository()
    listItemsService = new ListItemsService(fakeRepository)
  })

  it('should be able to list items', async () => {
    await fakeRepository.create({ title: 'image1', image: 'image1.jpg' })
    await fakeRepository.create({ title: 'image2', image: 'image2.jpg' })

    const getItems = await listItemsService.execute()

    expect(getItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'image2'
        })
      ])
    )
  })
})
