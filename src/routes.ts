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
  createImageContent,
  setRating
} from './routes/group';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: "uploads/media/images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
  });

  const upload = multer({
      storage: storage,
    });

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

  app.post('/set/rating', authenticateJWT, setRating)

}

export default routes;