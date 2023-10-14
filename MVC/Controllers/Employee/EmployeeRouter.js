const express = require("express")
const app = express()
const EmployeeController = require("./EmployeeController")
const validation = require("./EmployeeValidation");
const { validationResult, matchedData, body} = require("express-validator")
const Responder = require("../../Helpers/Responder")
app.use(express.json())

app.post("/insertion", [validation.dataValidation(), async (req, res, next) => {
    const { password } = matchedData(req);
    if (password) {
      await body('confirm_password')
        .equals(password)
        .withMessage('passwords do not match')
        .run(req);
    }
    next();
  }],  
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty())
    {
      const data = matchedData(req);
      EmployeeController.employeeDetailsInsertion(data,res);
    }
    else{
      return Responder.sendFailureObject(res, result.errors);
    }
} )
app.post("/login", validation.optionalValidate(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
      const data = matchedData(req);
      EmployeeController.login(data, res);
  }else{
      return Responder.sendFailureObject(res,result.errors);
  }
})
app.post("/logout", [validation.checkId()], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    EmployeeController.logout(data, res);
  }else{
      return Responder.sendFailureObject(res,result.errors);
  }
})

app.post("/getDetail", [validation.checkId()], (req, res) => {
  const result = validationResult(req);
  console.log(req.body)
  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log(data);
    EmployeeController.getDetails(data, res);
  }else{
      return Responder.sendFailureObject(res,result.errors);
  }
})

module.exports = app;