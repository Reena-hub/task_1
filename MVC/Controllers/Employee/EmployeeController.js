const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 4 });
const collection = require("../../Database/EmployeeSchema")
const Responder = require("../../Helpers/Responder")
const hashPassword = require('../../Helpers/Utils')
const token = new ShortUniqueId({ length: 8 });


function Controller() {
    this.employeeDetailsInsertion = async (data, res) => {
        try{
            console.log(data);
            let dataToInsert = {
                unique_id: uid.rnd(),
                name: data?.name + " " + (data?.last_name || ""),
                email: data?.email || "",
                password: hashPassword(data?.password || ""),
            }
            await collection.create(dataToInsert).then((response) => {
                console.log(response);
                return Responder.sendSuccessData(res ,response);
            }).catch((error) => {
                console.log(error);
                return Responder.sendFailureMessage( res,{message:"Email already exists"})
            })
        }
        catch{
            return Responder.sendFailureMessage(res, {message: "Some error occured"});
        }
    }
    this.login = async (data, res) => {
        try{
            let user = await collection.findOne({email: data?.email});
            console.log(user);
            if(user){
                let userPassword = hashPassword(data?.password);
                if(userPassword === user?.password)
                {
                    let auth_token = token.rnd();
                    user.auth_token = auth_token; 
                    user.markModified(['auth_token']);
                    user.save();
                    return Responder.sendSuccessData(res, {message:"Login Successful", auth_token: auth_token, success: true});
                }  
                else
                    return Responder.sendFailureMessage(res, {message: "Password doesn't match"})
            }else{
                return Responder.sendFailureMessage(res,{message: "User not found"});
            }
        }catch{
            return Responder.sendFailureMessage(res,{message: "An Error Occured"});
        }
    }
    this.logout = async (data, res) => {
        try{
            let user = await collection.findOne({auth_token: data?.auth_token});
            console.log(user);
            if(user){
                user.auth_token = ""; 
                user.markModified(['auth_token']);
                user.save();
                return Responder.sendSuccessData(res, {message:"Logout Successful", success: true});
            }else{
                return Responder.sendFailureMessage(res,{message: "User not found"});
            }
        }catch{
            return Responder.sendFailureMessage(res,{message: "An Error Occured"});
        }
    }
    this.getDetails = async (data, res) => {
        try{
            let user = await collection.findOne({auth_token: data?.auth_token});
            console.log(user);
            if(user){
                return Responder.sendSuccessData(res, {data:user});
            }else{
                return Responder.sendFailureMessage(res,{message: "User not found"});
            }
        }catch{
            return Responder.sendFailureMessage(res,{message: "An Error Occured"});
        }
    }
}

module.exports = new Controller();
