import express from 'express';
import { getQuestions, createQuestions, updateQuestions, deleteQuestions } from '../controllers/questions.js' ;
import auth from '../middleware/auth.js';

const router = express.Router();

// localhost:5000/questions

router.get('/:email', getQuestions);    // removed auth to check if its quicker
router.post('/', auth, createQuestions);
router.patch('/:id', auth, updateQuestions); 
router.delete('/:id', auth, deleteQuestions);

export default router;