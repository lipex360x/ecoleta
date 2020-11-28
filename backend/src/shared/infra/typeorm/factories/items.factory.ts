import Faker from 'faker'
import { define } from 'typeorm-seeding'
import Item from '@modules/items/infra/typeorm/entities/Item'

define(Item, (faker: typeof Faker, context: { roles: string[] }) => {
  const dateCreate = new Date()

  const item = Object.assign(Item, {
    item_id: faker.random.uuid(),
    title: '',
    image: '',
    created_at: dateCreate,
    updated_at: dateCreate,
    itemProps: null
  })

  return item
})
