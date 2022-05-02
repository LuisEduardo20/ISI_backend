import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from '../../Models/Product'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const products = await Product.all()

      response.ok(products)
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const product = await Product.findOrFail(id)

      if (product) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { codigo, nome, nome_fornecedor, email_fornecedor } = product['$attributes']

        response.ok({ codigo, nome, nome_fornecedor, email_fornecedor })
      } else {
        response.notFound({ error: 'Desculpe, não encontramos o produto :(' })
      }
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['codigo', 'nome', 'nome_fornecedor', 'email_fornecedor'])

    try {
      await Product.create(data)

      response.created({ status: 'Produto cadastrado com sucesso!' })
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = request.body()

    try {
      const product = await Product.findOrFail(id)

      await product.merge(data)
      await product.save()

      response.ok({ status: 'Produto atualizado com sucesso!' })
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const product = await Product.findOrFail(id)

      await product.delete()

      response.ok
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }
}
