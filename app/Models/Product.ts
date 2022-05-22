import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { ProductType } from './enums/ProductType'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public codigo: string

  @column()
  public nome: string

  @column()
  public nome_fornecedor: string

  @column()
  public email_fornecedor: string

  @column()
  public type: ProductType

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
