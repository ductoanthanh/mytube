import express from 'express';
import { getAuthUser, protect } from '../middleware/authorization';
import {
  getRecommendedChannels,
  editUser,
  getLikedVideos,
  getHistory,
  getFeed,
  searchUser,
  getProfile,
  toggleSubscribe,
} from '../controllers/user.controller';

function getUserRoutes() {
  const router = express.Router();

  router.get('/', protect, getRecommendedChannels);
  router.put('/', protect, editUser);

  router.get('/liked-videos', protect, getLikedVideos);
  router.get('/history', protect, getHistory);
  router.get('/subscriptions', protect, getFeed);
  router.get('/search', getAuthUser, searchUser);

  router.get('/:userId', getAuthUser, getProfile);
  router.get('/:userId/toggle-subscribe', protect, toggleSubscribe);

  return router;
}

export { getUserRoutes };
