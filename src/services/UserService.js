const Service = require("./Service");

class UserService extends Service{
    constructor(){
        super("users")
    }
}

module.exports = UserService