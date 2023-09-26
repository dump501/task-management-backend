const Service = require("./Service");

class RoleService extends Service{
    constructor(){
        super("roles")
    }
}

module.exports = RoleService