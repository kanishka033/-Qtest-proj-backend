import mongoose from "mongoose";
import questionSet from "../models/questions.js"

export const getQuestions = async (req, res) => {
    const email = req.params.email;
    const userId = req.userId;
    console.log(userId)
    try {
        const questions = await questionSet.find({ email }).sort({date:-1});
        res.status(200).json(questions)
    }
     catch(error) {
        res.status(404).json({ message: error.message })
    }
} 

export const createQuestions = async (req, res) => {
    const body = req.body;
    const newQuestion = new questionSet({ ...body, creator: req.userId });   
    try {
        await newQuestion.save();
        res.status(201).json(newQuestion)
    } 
    catch (error) {
        res.status(409).json({ message: error.message }) 
    }
}

export const updateQuestions = async (req, res) => {
    const { id: _id } = req.params;
    const body = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No doc with that id');

    const updatedQuestions = await questionSet.findByIdAndUpdate(_id, body, {new: true});
    res.json(updatedQuestions);
}

export const deleteQuestions = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No doc with that id');

    await questionSet.findByIdAndRemove(id);
    res.json({ message: 'Doc deleted successfully'})
}


