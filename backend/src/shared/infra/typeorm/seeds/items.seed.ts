import { v4 as uuid } from 'uuid'
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Item from '@modules/items/infra/typeorm/entities/Item'

export default class CreateItems implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Item)
      .values([
        { item_id: uuid(), title: 'Lâmpadas', image: 'lampadas.svg' },
        { item_id: uuid(), title: 'Pilhas e Baterias', image: 'baterias.svg' },
        { item_id: uuid(), title: 'Papeis e Papelões', image: 'papeis-papelao.svg' },
        { item_id: uuid(), title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
        { item_id: uuid(), title: 'Resíduos Orgânicos', image: 'organicos.svg' },
        { item_id: uuid(), title: 'Óleo de Cozinha', image: 'oleo.svg' }
      ])
      .execute()
  }
}
