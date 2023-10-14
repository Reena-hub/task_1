
function Responder() {
    this.sendFailureMessage =  (res, message) => {
        res.setHeader('content-type', 'application/json');
        res.send(message);
    }
    this.sendFailureObject =  (res, failureObject) => {
        res.setHeader('content-type', 'application/json');
        res.send(failureObject);
    }
    this.sendSuccessData =  (res, data) => {
        res.setHeader('content-type', 'application/json');
        res.send(data);
    }

}
module.exports = new Responder();