class User {
    constructor(uid, first_name, last_name, email, password) {
        this.uid = uid;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}
module.exports = User;