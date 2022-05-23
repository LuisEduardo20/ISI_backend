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
Route.group(() => {
  Route.get('/', 'ProductsController.index')
  Route.get('/:id', 'ProductsController.show')
  Route.post('/', 'ProductsController.store')
  Route.put('/:id', 'ProductsController.update')
  Route.delete('/:id', 'ProductsController.destroy')
}).prefix('products')

//Filtros de produtos
Route.get('/snacks', 'ProductsController.getSnackProducts')
Route.get('/drinks', 'ProductsController.getDrinkProducts')

//login
Route.post('/login', 'AuthController.login')

//show
Route.group(() => {
  Route.get('/', 'ShowsController.index')
  Route.get('/:id', 'ShowsController.show')
  Route.post('/', 'ShowsController.store')
  Route.put('/:id', 'ShowsController.update')
  Route.delete('/:id', 'ShowsController.destroy')
}).prefix('shows')
