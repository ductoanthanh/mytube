import express from 'express';

import { getAuthRoutes } from './auth.route';
import { getUserRoutes } from './user.route';
import { getVideoRoutes } from './video.route';

function getRoutes() {
  const router = express.Router();

  router.use('/auth', getAuthRoutes());
  router.use('/users', getUserRoutes());
  router.use('/videos', getVideoRoutes());

  return router;
}

export { getRoutes };
