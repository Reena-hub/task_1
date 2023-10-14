const mongoose = require("mongoose");

function MultiDBConnection(){
    this.createConnection = () => {
        mongoose.connect("mongodb://localhost:27017/mydb",{
            useNewUrlParser: true,                                   
            useUnifiedTopology: true,                              
            serverSelectionTimeoutMS: 10000
        }).then(() => {
            console.log("DB Connected");
        }).catch((e)=>{
            console.log(e);
        })
    }
}

module.exports = new MultiDBConnection();