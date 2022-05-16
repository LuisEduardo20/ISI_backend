import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {

  public async register({ request, response }: HttpContextContract) {
    const data = request.only(['email', 'password']);

    try {
      await User.create(data);

      response.created({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      response.internalServerError({ message: 'Ops, algo de errado aconteceu!' });
    }
  }

  public async login({request, response }: HttpContextContract) {
    const data = request.only(['email', 'password']);

    try {
      const user = await User.findBy('email', data.email);

      if (user) {
        if (user.password !== data.password) {
          response.unauthorized({ message: 'Usuário ou senha inválidos!' });
        }else{
          response.ok({ token: user.getToken() });
        }

      }else{
        response.notFound({ message: 'O usuário informado não existe.' });
      }


    } catch (error) {
      response.internalServerError({ message: 'Ops, algo de errado aconteceu!' });
    }
  }

}
