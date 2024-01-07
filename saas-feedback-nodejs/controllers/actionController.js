const formidable = require("formidable");
const path = require("path");
const APIResponse = require("../models/ApiResponse");
const {readAction, writeAction} = require("../models/mongoSchemas/action");
const languagejson = require("../controllers/commonController");

exports.saveImportAction = async (req, res) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
  const Response = new APIResponse()
  Response.setTag('/api/master/action/save/import')
  try {
    const { inputData } = req.body;
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      var result1 = JSON.parse(fields.data);

      const filelength = result1.filelength;
      const indexNo = result1.indexNo;
      var listingArray = [];

      const data = await readAction.find({
        actionName: result1.inputData.actionName
      }).select('_id').lean();

      var actionResult = await readAction.find({
        actionName: result1.inputData.actionName,
        actionShortName: result1.inputData.actionShortName,
        actionDescription: result1.inputData.actionDescription,
        actionUrl: result1.inputData.actionUrl,
      });

      if (data.length === 0) {
        actionData = new writeAction({
          actionName: result1.inputData.actionName,
          actionShortName: result1.inputData.actionShortName,
          actionDescription: result1.inputData.actionDescription,
          actionUrl: result1.inputData.actionUrl,
          status: 1,
          createdOn: new Date(),
          createdBy: req.body.authorisedUser._id,
          lastModifiedOn: new Date(),
          lastModifiedBy: req.body.authorisedUser._id,
        });
        actionData.save();

      } else if(actionResult.length>0){
        result1.inputData.actionName= null;
        const errorImport = new ErrorStatus({
          columnName: 'Action Name',
          rowNo: result1.indexNo,
          columnNo: 1,
          columnData:'Action Data Already Exist',
          fileImportId: result1.importId,
          createdOn: new Date()
      })
      await errorImport.save()
        return res.send(new APIResponse(0, lang["Data Already Exists"], "", "/import/assets/save"));

      }else{
        actionData = await writeAction.findByIdAndUpdate(data[0]._id,{
          actionName: result1.inputData.actionName,
          actionShortName: result1.inputData.actionShortName,
          actionDescription: result1.inputData.actionDescription,
          actionUrl: result1.inputData.actionUrl,
          lastModifiedOn: new Date(),
          lastModifiedBy: req.body.authorisedUser._id

        }, {new: true})
      }

      res.send(new APIResponse(1, lang["Success"], "", "/import/assets/save"));
    });
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
exports.advanceActionSearch = async (req, res, next) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
  const Response = new APIResponse();
  Response.setInput(req.body);
  Response.setTag("/api/master/action/advance/search");
  try {
    let query = [];
    let action = [];
    if (req.body.actionName) {
      query.push({ actionName: req.body.actionName });
    }
    if (req.body.actionShortName) {
      query.push({ actionShortName: req.body.actionShortName });
    }
    if (req.body.status && req.body.status !== "") {
      if (req.body.status === 'Active') {
        query.push({ status: 1 });
      } else if (req.body.status === '2') {
        query.push({ status: 2 });
      }
    }
    if (query.length > 0) {
      action = await readAction.find({ $and: query }).limit(100).lean();
    } else {
      action = await readAction.find({ $or: [{status: 1}, {status: 2}] }).sort({ lastModifiedOn: -1 }).limit(100).lean();
    }
    if (action.length) {
      Response.setStatus(1);
      Response.setResult(action);
      Response.setDescription(lang["Successfully found action"]);
      return res.send(Response);
    } else {
      Response.setStatus(2);
      Response.setResult(null);
      Response.setDescription(lang["No action found"]);
      return res.send(Response);
    }
  } catch (err) {
    Response.setStatus(0);
    Response.setResult(null);
    Response.setDescription(err.message);
    return res.send(Response);
  }
};
exports.fetchActionNames = async (req, res, next) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
  const Response = new APIResponse();
  Response.setInput(req.body);
  Response.setTag("/api/master/action/names/fetch");
  try {
    if (!req.body.keyword || req.body.keyword === "") {
      Response.setStatus(2);
      Response.setResult(null);
      Response.setDescription(lang["Could not find keyword"]);
      return res.send(Response);
    }
    const actions = await readAction.find({
      status: 1,
      actionName: {
        $regex: req.body.keyword,
        $options: "i",
      },
    })
      .select("actionName")
      .limit(20)
      .lean();
    Response.setStatus(1);
    Response.setResult({ actions });
    Response.setDescription(lang["Fetched actions names"]);
    return res.send(Response);
  } catch (err) {
    const Response = new APIResponse();
    Response.setInput(req.body);
    Response.setTag("/api/master/action/names/fetch");
    Response.setStatus(0);
    Response.setResult(null);
    Response.setDescription(err.message);
    return res.send(Response);
  }
};
exports.saveAction = async (req, res, next) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
    const Response = new APIResponse();
    Response.setInput(req.body);
    Response.setTag("/api/master/action/save");
    try {
      if (req.body.actionName === "") {
        Response.setStatus(2);
        Response.setResult(null);
        Response.setDescription("Could not find Action Name");
        return res.send(Response);
      }
      if (req.body.actionShortName === "") {
        Response.setStatus(2);
        Response.setResult(null);
        Response.setDescription("Could not find Action Short Name");
        return res.send(Response);
      }
      if (req.body.actionDescription === "") {
        Response.setStatus(2);
        Response.setResult(null);
        Response.setDescription("Could not find Action Description");
        return res.send(Response);
      }
      if (req.body.actionUrl === "") {
        Response.setStatus(2);
        Response.setResult(null);
        Response.setDescription("Could not find Action Url");
        return res.send(Response);
      }
      if (req.body.status === "") {
        Response.setStatus(2);
        Response.setResult(null);
        Response.setDescription("Could not find status");
        return res.send(Response);
      }
  
      let action = null;
      if (req.body._id === "") {
        action = new writeAction({
          actionName: req.body.actionName,
          actionShortName: req.body.actionShortName,
          actionDescription: req.body.actionDescription,
          actionUrl: req.body.actionUrl,
          status: req.body.status,
          createdOn: new Date(),
          createdBy: req.body.authorisedUser._id,
          lastModifiedOn: new Date(),
          lastModifiedBy: req.body.authorisedUser._id,
        });
        await action.save();
      } else {
        //archieve action
        // const existingAction = await Actions.findById(req.body._id).lean()
        // delete existingAction._id
        // const newActionArchieve = new ActionArchieve(existingAction)
        // newActionArchieve.tin = `${existingAction.tin}-${newActionArchieve._id}`
        // await newActionArchieve.save()
        action = await writeAction.findByIdAndUpdate(
          req.body._id,
          {
            actionName: req.body.actionName,
            actionShortName: req.body.actionShortName,
            actionDescription: req.body.actionDescription,
            actionUrl: req.body.actionUrl,
            status: req.body.status,
            createdOn: new Date(),
            createdBy: req.body.authorisedUser._id,
            lastModifiedOn: new Date(),
            lastModifiedBy: req.body.authorisedUser._id,
          },
          { new: true }
        );
      }
      
    Response.setStatus(1);
    Response.setResult({ action });
    Response.setDescription(lang["Successfully Saved Action!"]);
    return res.send(Response);
  } catch (err) {
    const Response = new APIResponse();
    Response.setInput(req.body);
    Response.setStatus(0);
    Response.setTag("/api/master/action/save");
    Response.setDescription(err.message);
    return res.send(Response);
  }
};
exports.getAction = async (req, res, next) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
    try {
      const action = await readAction.find({
        // status: 1,
        // parentPartnerId: { $exists: false }
      })
        .sort({ lastModifiedOn: -1 })
        .limit(2500)
        .lean();
      if (action) {
        const Response = new APIResponse();
        Response.setInput(req.body);
        Response.setTag("/action/get");
        Response.setStatus(1);
        Response.setResult(action);
        Response.setDescription(
          lang["Successfully fetched Actions!"]);
        return res.send(Response);
      } else {
        const Response = new APIResponse();
        Response.setInput(req.body);
        Response.setTag("/action/get");
        Response.setStatus(2);
        Response.setResult(null);
        Response.setDescription(lang["Actions Not found!"]);
        return res.send(Response);
      }
    } catch (err) {
      const Response = new APIResponse();
      Response.setInput(req.body);
      Response.setTag("/action/get");
      Response.setStatus(0);
      Response.setResult(null);
      Response.setDescription(err.message);
      return res.send(Response);
    }
  };

  exports.actionFetchById = async (req, res) => {
    const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
    const Response = new APIResponse()
    Response.setInput(req.body)
    Response.setTag('/api/master/action/fetch/id')
  
    try {
      if (!req.body.id || req.body.id === '') {
        Response.setStatus(2)
        Response.setResult(null)
        Response.setDescription(lang['Could not find id'])
        return res.send(Response)
      }
      const actions = await readAction.findById({
        // status: 1,
        _id: req.body.id
      }).lean()
      Response.setStatus(1)
      Response.setResult({ actions })
      Response.setDescription(lang['Fetched Action By Id'])
      return res.send(Response)
    }
    catch (err) {
      const Response = new APIResponse()
      Response.setInput(req.body)
      Response.setStatus(0)
      Response.setTag('/api/master/action/fetch/id')
      Response.setDescription(err.message)
      return res.send(Response)
    }
}

exports.simpleSearchActionData = async (req, res) => {
  const lang = languagejson.whichJSONToUse(req.body.authorisedUser.language)
  try {
    let actionData = [];
    if (req.body.search !== '') {
      actionData = await readAction.find({
        status: 1,
        $or: [{
          actionName:{
            $regex: req.body.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i'
          }
        },
        {
          actionShortName:{
              $regex: req.body.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i'
          }  
        }
        ],
      }).sort({
        lastModifiedOn: -1
      });
    } else {
      actionData = await readAction.find({status:1}).sort({
        lastModifiedOn: -1
      }).lean();
    }
    if (actionData.length > 0) {
      const Response = new APIResponse();
      Response.setStatus(1);
      Response.setTag("/api/master/action/simpleSearchActionData");
      Response.setInput(req.body);
      Response.setResult(actionData);
      Response.setDescription(lang["Successfully found Action"]);
      return res.send(Response);
    }
    else if(actionData.length === 0){
      const Response = new APIResponse();
      Response.setStatus(3);
      Response.setTag("/api/master/action/simpleSearchActionData");
      Response.setInput(req.body);
      Response.setResult(actionData);
      Response.setDescription(lang["No Such Action Exists"]);
      return res.send(Response);
    }
    else {
      const Response = new APIResponse();
      Response.setStatus(2);
      Response.setTag("/api/master/action/simpleSearchActionData");
      Response.setInput(req.body);
      Response.setResult(null);
      Response.setDescription(lang["No Action Found"]);
      return res.send(Response);
    }
  } catch (error) {
    const Response = new APIResponse();
    Response.setStatus(0);
    Response.setTag("/api/master/action/simpleSearchActionData");
    Response.setInput(req.body);
    Response.setResult(null);
    Response.setDescription(error.message);
    return res.send(Response);
  }
};