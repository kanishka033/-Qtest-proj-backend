import express from 'express';
import { fetchQuest, addResponse, emailResponse, onetimeResponse, deleteResponse } from '../controllers/response.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// localhost:5000/response
router.get('/:url', fetchQuest);
router.patch('/:url', addResponse);
router.patch('/email/:url', emailResponse);
router.patch('/onetime/:url', onetimeResponse);
router.patch('/delete/:id/:resId', deleteResponse);

export default router;