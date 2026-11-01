import { Router } from "express";
import {handleGoogleAuth} from '../controllers/auth.controller.js';

const router = Router();

router.route('/google').post(handleGoogleAuth);
export default router;