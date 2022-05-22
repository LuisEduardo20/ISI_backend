import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ProductType } from 'App/Models/enums/ProductType'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('codigo', 15).unique().notNullable()

      table.string('nome').notNullable()

      table.string('nome_fornecedor').notNullable()

      table.string('email_fornecedor').notNullable()

      table.float('preco').notNullable()

      table.enum('tipo', Object.values(ProductType)).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
