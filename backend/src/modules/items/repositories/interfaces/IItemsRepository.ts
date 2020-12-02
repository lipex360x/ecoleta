import Item from '@modules/items/infra/typeorm/entities/Item'

export interface FindAllByIdProps {
  arrayItemsIds: string[]
}

export interface FindByNameProps {
  title: string
}

export interface CreateProps {
  title: string
  image: string
}

export default interface IItemsRepository {
  create(data: CreateProps): Promise<Item>
  findByName(data: FindByNameProps): Promise<Item>
  findAll(): Promise<Item[]>
  findAllById(data: FindAllByIdProps): Promise<Item[]>
}
