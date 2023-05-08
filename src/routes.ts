import { Express } from 'express';
import { 
  generateToken,
  userLogin,
  userRegister,
  authenticateJWT,
  deleteSessionHandler 
} from './routes/auth';
import { 
  createNewGroup,
  getCategories,
  getMedias,
  getGroup,
  createImageContent
} from './routes/group';

import multer from 'multer';

const upload = multer({ dest: `media/images` })

function routes(app: Express) {
  app.post('/login', userLogin)

  app.post('/register', userRegister)

  app.post('/token', generateToken)

  app.delete('/logout', deleteSessionHandler)

  app.get('/categories', getCategories)

  app.get('/medias', getMedias)

  app.post('/new/group', authenticateJWT, createNewGroup)

  app.get('/get/group/', authenticateJWT, getGroup)

  app.post('/new/image/content', upload.single('image'), authenticateJWT, createImageContent)
}

export default routes;