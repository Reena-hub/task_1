const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

require('./Database/MultiConnection').createConnection();

app.use('/employee', require('./Controllers/Employee/EmployeeRouter'));

let server = app.listen(9000, function () {
	console.log("server is running in " + server.address().port);
});

module.exports = app;