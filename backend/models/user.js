class User {

    // constructor() {}
    constructor(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //ADD methods here 

    get email() {
        return this._email;
    }
    set email(emailValue) {
        if (!emailValue.includes("@")) {
            console.log("Email Not valid");
            return;
        }
        this._email = emailValue;
    }
    get password() {
        return this._password;
    }
    set password(passwordValue) {
        if (passwordValue.length < 8) {
            console.log("password Too Short!");
            return;
        }
        this._password = passwordValue;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(firstNameValue) {
        this._firstName = firstNameValue;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(lastNameValue) {
        this._lastName = lastNameValue;
    }

}

module.exports = User;