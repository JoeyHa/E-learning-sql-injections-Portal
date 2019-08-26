class User {

    constructor() {}
    constructor(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //ADD methods here 

    get email() {
        return this.email;
    }
    set email(emailValue) {
        if (!emailValue.contains("@")) {
            console.log("Email Not valid");
            return;
        }
        this.email = emailValue;
    }
    get password() {
        return this.password;
    }
    set password(passwordValue) {
        if (passwordValue.length() < 8) {
            console.log("password Too Short!");
            return;
        }
        this.password = passwordValue;
    }
    get firstName() {
        return this.firstName;
    }
    set firstName(firstNameValue) {
        this.firstName = firstNameValue;
    }
    get lastName() {
        return this.lastName;
    }
    set lastName(lastNameValue) {
        this.lastName = lastNameValue;
    }

}

module.exports = User;