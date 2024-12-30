//eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    orders: {
      id: string
      item: string
      unity: number
      price: number
      created_at: string
      updated_at?: string | null
    }
  }
}
