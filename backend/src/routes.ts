import { Express } from 'express';
import { generateToken, userLogin, userRegister } from './routes/auth';

function routes(app: Express) {
  app.post('/login', userLogin)

  app.post('/register', userRegister)

  app.post('/token', generateToken)

  // app.delete('/api/session', deleteSessionHandler)
}

export default routes;