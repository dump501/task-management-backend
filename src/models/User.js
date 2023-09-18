
class User{
    constructor(id, name, email, profile, password, role_id, is_active){
        this.id = id
        this.name = name;
        this.email = email;
        this.profile = profile;
        this.password = password;
        this.role_id = role_id
        this.is_active=is_active
    }

    fromJson({id, name, email, profile, password, role_id, is_active}){
        this.id = id
        this.name = name;
        this.email = email;
        this.profile = profile;
        this.password = password;
        this.role_id = role_id
        this.is_active = is_active
    }

    serialize(){
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            profile: this.profile,
            role_id: this.role_id,
            is_active: this.is_active
        }
    }
}

module.exports = User