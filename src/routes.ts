import { Express } from 'express';
import { generateToken, userLogin, userRegister } from './routes/auth';
import { getCategories } from './routes/tables';

function routes(app: Express) {
  app.post('/login', userLogin)

  app.post('/register', userRegister)

  app.post('/token', generateToken)

  // app.delete('/api/session', deleteSessionHandler)

  app.get('/categories', getCategories)
}

export default routes;