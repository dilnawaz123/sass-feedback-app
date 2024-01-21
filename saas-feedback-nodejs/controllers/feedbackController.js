
const APIResponse = require("../models/ApiResponse");
const { readfeedback, writefeedback } = require("../models/mongoSchemas/feedback")

exports.saveImportAction = async (req, res) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
  const Response = new APIResponse()
  Response.setTag('/api/master/action/save/import')
  try {


    const feedback = await new writefeedback({
      actionName: result1.inputData.actionName,
      actionShortName: result1.inputData.actionShortName,
      actionDescription: result1.inputData.actionDescription,
      actionUrl: result1.inputData.actionUrl,
    });
    feedback.save()

    res.send(new APIResponse(1, lang["Success"], "", "/import/assets/save"));

  } catch (err) {
    res.send(
      new APIResponse(
        0,
        err.message ? err.message : err,
        err,
        "",
        "/import/action/save"
      )
    );
  }
}
