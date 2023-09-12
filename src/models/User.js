
class User{
    constructor(id, name, email, profile, password, role_id){
        this.id = id
        this.name = name;
        this.email = email;
        this.profile = profile;
        this.password = password;
        this.role_id = role_id
    }

    fromJson({id, name, email, profile, password, role_id}){
        this.id = id
        this.name = name;
        this.email = email;
        this.profile = profile;
        this.password = password;
        this.role_id = role_id
    }

    serialize(){
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            profile: this.profile,
            role_id: this.role_id
        }
    }
}

module.exports = User