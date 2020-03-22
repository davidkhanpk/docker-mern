module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = "Username must not be empty"
    }
    if(email.trim() === '') {
        errors.email = "email must bot be empty"
    } else {
        const regex = ""
    }
    if(password === '') {
        errors.password = "Password must not be empty"
    } else if(password != confirmPassword) {
        errors.password = "Password must match"
    }

    return {
        errors,
        valid: Object.keys(errors).length ? false : true
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = "Username must not be empty"
    }
    if(password === '') {
        errors.password = "Password must not be empty"
    }
    return {
        errors,
        valid: Object.keys(errors).length ? false : true
    }
}