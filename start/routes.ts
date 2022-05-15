/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Produto
Route.get('/products', 'ProductsController.index')
Route.get('/products/:id', 'ProductsController.show')
Route.post('/products', 'ProductsController.store')
Route.put('/products/:id', 'ProductsController.update')
Route.delete('/products/:id', 'ProductsController.destroy')

//login
Route.post('/login', 'AuthController.login')
