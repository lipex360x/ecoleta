import Point from '@modules/points/infra/typeorm/entities/Point'

interface ItemsProps {
  item_id: string
}

export interface CreateProps {
  name: string
  image: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
  items: ItemsProps[]
}

export interface FindByIdProps{
  point_id: string
}

export interface ListPointsFilteredProps{
  city?: string
  uf?: string
  items?: string
}

export default interface IPointsRepository {
  create(data: CreateProps): Promise<Point>
  findById(data: FindByIdProps): Promise<Point>
  listPointsFiltered(data: ListPointsFilteredProps): Promise<Point[]>
}
