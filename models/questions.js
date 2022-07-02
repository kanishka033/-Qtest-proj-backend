import mongoose from "mongoose";

const Schema  = mongoose.Schema;
const Objectid = Schema.ObjectId;

// question schema can contain images in future updates
const questionSchema = new Schema({
    questionText: { type: String },
    options: { type: [] },
    questionType: { type: String },
    open: { type: Boolean },
    correct_answer: { type: String },
   // category: { type: String },
   // difficulty: { type: String }
});

const responseSchema = new Schema({
    user_email: {
        type: String
    },
    answer: [{
        questionText: { type: String },
        questionType: { type: String },
        answer: Schema.Types.Mixed
    }],
    date: { 
        type: Date,
        default: Date.now
    }
})

const questionSetSchema = new Schema({
    documentName: {
        type: String,
        required: true
    },
    documentDescription: { type: String },
    questions: [questionSchema],
    responses:[responseSchema],
    open: { type: Boolean },
    email_required: { type: Boolean },
    res_limit: { type: Boolean },
    timer: { type: Boolean },
    time:{ type: String },
    email: { type: String },
    creator: { type: String },
    url : { type: String },
    date: {
        type: Date,
        default: Date.now
    }
})

const questionSet = mongoose.model('questionSet', questionSetSchema);

export default questionSet;
