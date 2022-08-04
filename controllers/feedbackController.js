const User = require('../models/user');
const ToDo = require('../models/toDo');
const Task = require('../models/task');
const Feedback = require('../models/feedback');
const Question = require('../models/question');
const Response = require('../models/response');


module.exports.viewAllFeedbacks = async (req , res)=>{
    if(!req.user){
        return res.render('landingPage' , {
            layout: 'blank_layout',
            title: 'Employee.Jet | Admin'
        });
    }
    //populate the feedback page
    // const admin = await Admin.findById(req.user._id);
    const feedbacks = await User.findById(req.user._id).populate(`feedback`);
    return res.render('feedback/viewAll', {
        layout: 'blank_layout',
        title: 'View Feedbacks',
        onPage: 'feedback',
        // admin: admin,
        feedbacks: feedbacks,
    });
}


module.exports.showFeedback = async (req, res) => {
    if(!req.user){
        return res.render('landingPage' , {
            layout: 'blank_layout',
            title: 'Employee.Jet | Admin'
        });
    }
    const feedback = await Feedback.findById(req.params.id).populate({ path: 'questions', populate: { path: 'responses', populate: { path: 'byEmpObjId' } } });
    let feedbackData=[];
    
    if (feedback.isFilledBy.includes(req.user._id))
    {
        for (let i = 0; i < feedback.questions.length; i++) {
            let question = feedback.questions[i];
            for (let j = 0; j < question.responses.length; j++) {
                //console.log(question.responses[j].byEmpObjId._id.toString()===req.user._id.toString());
                let response = question.responses[j];
                if (response.byEmpObjId._id.toString() === req.user._id.toString()) 
                {
                    feedbackData.push(response);
                    }
            }
        }
    }
    //console.log(feedback);
    return res.render('feedback/show', {
        layout: 'blank_layout',
        title: 'View Feedback',
        onPage: 'feedback',
        feedback: feedback,
        feedbackData: feedbackData,
        by: req.user._id.toString()
    });
}

//patch request to edit the feedback
module.exports.editFeedback = async (req, res) => {
    //console.log(req.body);
    for (const [key, value] of Object.entries(req.body)) {
        //console.log(`${key}: ${value}`);
        const response_id = key.split('-')[1];
        const response = value;
        const result=await Response.findByIdAndUpdate(response_id, { response: response }, { new: true });
        //console.log(result);
    }
    
    res.redirect('/feedback/' + req.params.id);
} 

module.exports.createFeedbackResponse = async (req, res) => {
    for (const [key, value] of Object.entries(req.body)) {
        //console.log(`${key}: ${value}`);
        const question_id = key.split('-')[1];
        const response = value;
        const responseTemp = new Response({ response, byEmpObjId: req.user });
        const newResponse = await responseTemp.save();
        const result = await Question.findByIdAndUpdate(question_id, { $push: { responses: newResponse._id } }, { new: true });
    }
    const result2= await Feedback.findByIdAndUpdate(req.params.id, { $push: { isFilledBy: req.user } }, { new: true });
    console.log(result2);
    res.redirect('/feedback/' + req.params.id);
}