import Item from '@modules/items/infra/typeorm/entities/Item'

export interface CreateProps {
  title: string
  image: string
}

export default interface IItemsInterface {
  create(data: CreateProps): Promise<Item>
  listAll(): Promise<Item[]>
}
