
const APIResponse = require("../models/ApiResponse");
const { readfeedback, writefeedback } = require("../models/mongoSchemas/feedback")

exports.saveSassFeedback = async (req, res) => {
 
  const Response = new ApiResponse();
  Response.setInput(req.body);
  Response.setTag('/api/add/new/sassFeedback')
  try {


    const feedback = await new writefeedback({
      feedbackTitle: req.body.title,
      category: req.body.category,
      feedbackDetail: req.body.details,
      createdOn: new Date(),
      lastModifiedOn: new Date(),
    });
    feedback.save()

    Response.setStatus(1);
    Response.setResult(null);
    Response.setDescription("Successfully Saved Data");
    return res.send(Response);

  } catch (err) {

    Response.setStatus(0);
    Response.setResult(null);
    Response.setDescription(err.message);
    return res.send(Response);
  }
}

