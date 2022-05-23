import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Show from 'App/Models/Show'

export default class ShowsController {

  public async index({ response }: HttpContextContract) {
    try {
      const shows = await Show.all()

      response.ok(shows)
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const show = await Show.find(id)

      if (show) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id, nome_atracao, data, hora } = show['$attributes']

        response.ok({ id, nome_atracao, data, hora })
      } else {
        response.notFound({ error: 'Desculpe, não encontramos o show :(' })
      }
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nome_atracao', 'data', 'hora'])

    try {
      await Show.create(data)

      response.created({ status: 'Show cadastrado com sucesso!' })
    } catch (error) {
      console.log(error)
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = request.body()

    try {
      const show = await Show.find(id)

      if (show) {
        await show.merge(data)
        await show.save()

        response.ok({ status: 'Produto atualizado com sucesso!' })
      } else {
        response.notFound({ error: 'Desculpe, não encontramos o show :(' })
      }
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const show = await Show.find(id)

      if (show) {
        await show.delete()
      } else {
        response.notFound({ error: 'Desculpe, não encontramos o show :(' })
      }

      response.ok
    } catch (error) {
      response.internalServerError({ error: 'Ops, algo de errado aconteceu!' })
    }
  }
}
