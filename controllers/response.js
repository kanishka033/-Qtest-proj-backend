import questionSet from "../models/questions.js";

export const fetchQuest = async (req, res) => {
    const { url } = req.params;
    try {
        const question = await questionSet.findOne({ url })
        res.status(200).json(question)
    }
     catch(error) {
        res.status(404).json({ message: error.message })
    }
}

// if res_limit then checks user_email (email) in responses, if found send 'found' else send 'error' & then can be proceded
// or check json.response data in reducers if there was response and there is null response

// anonymous case
export const addResponse = async (req, res) => {
    const { url } = req.params;
    const { answer } = req.body; 

    try {
    const response = await questionSet.findOneAndUpdate({ url, open: true },
        {
          $push: {
            responses: { answer }
            }
    });
    res.json(response);
    } catch (error) {
        console.log(error)
    }
}

// email case
export const emailResponse = async (req, res) => {
    const { url } = req.params;
    const { user_email, answer } = req.body;

    try {
        await questionSet.findOneAndUpdate({ url, open: true  }, {
            $pull: { responses: { user_email }}
        });

        const response = await questionSet.findOneAndUpdate({ url, open: true }, {
            $addToSet: { responses: {  user_email, answer }}
        })
        res.json(response);
    } catch(error) {
        console.log(error);
    }
}  

// 1-time case 
// following can be sent as response 
export const onetimeResponse = async (req, res) => {
    const { url } = req.params;
    const { user_email, answer } = req.body;
    try {
    let response = await questionSet.findOneAndUpdate({ url, open: true, "responses.user_email": { $ne: user_email }}, {
            $addToSet: { responses: {  user_email, answer }}
        })
    console.log(response.questions);
    } catch (error) {
        console.log(error.message);
    }
}

// only one used in response tab
export const deleteResponse = async(req, res) => {
    const id = req.params.id;
    const resId = req.params.resId;
    try {
        await questionSet.findOneAndUpdate({ _id: id }, {
            $pull: { responses: { _id: resId }}
        });
    } catch (error){
        console.log(error);
    }
}