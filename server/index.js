import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/questions.js';
import userRoutes from './routes/user.js';
import responseRoutes from './routes/response.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/questions', questionRoutes)
app.use('/users', userRoutes)
app.use('/response', responseRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch(()=> console.log(error))

