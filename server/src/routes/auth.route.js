import express from 'express';
import { protect } from '../middleware/authorization';
import { googleLogin, me, signout } from '../controllers/auth.controller';

function getAuthRoutes() {
  const router = express.Router();

  router.post('/google-login', googleLogin);
  router.get('/me', protect, me);
  router.get('/signout', signout);

  return router;
}

export { getAuthRoutes };
