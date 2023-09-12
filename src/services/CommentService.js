const Service = require("./Service");

class CommentService extends Service{
    constructor(){
        super("comments")
    }
}

module.exports = CommentService