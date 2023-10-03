import express from 'express';

import {
  register,
  activateUser,
  login,
  logout,
  updateAccessToken,
  socialAuth,
  resendActivationToken,
  forgotPassword,
  resetPassword
} from '../controllers';
import { isAuthenticated, verifyRefreshToken } from '../middlewares';

const router = express.Router();

// .../api/v1
router.post('/register', register);

router.post('/activate', activateUser);
router.post('/activate/resend', resendActivationToken);

router.post('/login', login);
router.post('/social-auth', socialAuth);

router.get('/logout', isAuthenticated, logout);

router.post('/refresh', verifyRefreshToken, updateAccessToken);

router.route('/password/forgot').post(forgotPassword); // Resend - gọi lại forgotPassword
router.route('/password/reset').put(resetPassword);

export const authRouter = router;
