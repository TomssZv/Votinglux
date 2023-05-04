import { Express } from 'express';
import { generateToken, userLogin, userRegister, authenticateJWT } from './routes/auth';
import { createNewGroup, getCategories, getMedias } from './routes/tables';

function routes(app: Express) {
  app.post('/login', userLogin)

  app.post('/register', userRegister)

  app.post('/token', generateToken)

  // app.delete('/api/session', deleteSessionHandler)

  app.get('/categories', getCategories)

  app.get('/medias', getMedias)

  app.post('/new/group', authenticateJWT, createNewGroup)
}

export default routes;