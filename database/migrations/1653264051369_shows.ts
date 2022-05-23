import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shows extends BaseSchema {
  protected tableName = 'shows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome_atracao').notNullable()
      table.string('data').notNullable()
      table.string('hora').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
