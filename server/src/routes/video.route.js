import express from 'express';
import { getAuthUser, protect } from '../middleware/authorization';
import {
  getRecommendedVideos,
  addVideo,
  getTrendingVideos,
  searchVideos,
  addComment,
  deleteComment,
  addVideoView,
  likeVideo,
  dislikeVideo,
  getVideo,
  deleteVideo,
} from '../controllers/video.controller';

function getVideoRoutes() {
  const router = express.Router();

  router.get('/', getRecommendedVideos);
  router.post('/', protect, addVideo);

  router.get('/trending', getTrendingVideos);
  router.get('/search', searchVideos);

  router.post('/:videoId/comments', protect, addComment);
  router.delete('/:videoId/comments/:commentId', protect, deleteComment);

  router.get('/:videoId/view', getAuthUser, addVideoView);
  router.get('/:videoId/like', protect, likeVideo);
  router.get('/:videoId/dislike', protect, dislikeVideo);

  router.get('/:videoId', getAuthUser, getVideo);
  router.delete('/:videoId', protect, deleteVideo);

  return router;
}

export { getVideoRoutes };
