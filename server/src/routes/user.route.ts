import express from 'express';

import { getProfile, updateProfile, updatePassword, updateAvatar } from '../controllers';
import { isAuthenticated, uploadAvatar } from '../middlewares';

const router = express.Router();

// .../api/v1
router
  .route('/user/me')
  .get(isAuthenticated, getProfile)
  .put(isAuthenticated, uploadAvatar.single('avatar'), updateProfile);

router.put('/user/avatar', isAuthenticated, uploadAvatar.single('avatar'), updateAvatar);

router.put('/user/password/update', isAuthenticated, updatePassword);

export const userRouter = router;
