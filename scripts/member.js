window.onload = function () {
    var regform = document.getElementById("member_form");
    regform.onsubmit = main;
};
function main() {
    var isValid = true;
    if (!isEnteryComplete()) {
        isValid = false;
    }
    if (!isCorporateSelected()) {
        if (!isCompanyPresent()) {
            isValid = false;
        }
    }
    if (!isValid) {
        event.preventDefault();
    }
}
function verifyEmail() {
    var email = document.getElementById("email");
    if (!isEmailValid(email.value)) {
        var errMsg = email.nextElementSibling;
        errMsg.innerHTML = "Format must be: qq@qq.qq";
        return false;
    }
    else {
        var errMsg = email.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
}
function isEmailValid(email) {
    var emailPattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    return emailPattern.test(email);
}
function verifyPassword() {
    var password = document.getElementById("password");
    var verifyPassword = document.getElementById("verify");
    if (password.value.length < 6) {
        var errMsg = password.nextElementSibling;
        errMsg.innerHTML = "Password is too short";
        return false;
    }
    else if (password.value != verifyPassword.value) {
        var errMsg = password.nextElementSibling;
        errMsg.innerHTML = "Password does not match entry below";
        return false;
    }
    else {
        var errMsg = password.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
}
function isCorporateSelected() {
    var corpChecked = document.getElementById("corporate");
    var corpName = document.getElementById("company_name");
    corpName.disabled = corpChecked.checked ? false : true;
    if (!corpName.disabled) {
        corpName.focus();
        return false;
    }
    return true;
}
function isCompanyPresent() {
    var companyName = document.getElementById("company_name");
    if (companyName && companyName.value) {
        var errMsg = companyName.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
    else {
        var errMsg = companyName.nextElementSibling;
        errMsg.innerHTML = "Company Name Required";
        return false;
    }
}
function verifyPhone() {
    var phone = document.getElementById("phone");
    if (!isPhoneValid(phone.value)) {
        var errMsg = phone.nextElementSibling;
        errMsg.innerHTML = "Format must be: 555-555-5555";
        return false;
    }
    else {
        var errMsg = phone.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
}
function isPhoneValid(phone) {
    var phonePattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;
    return phonePattern.test(phone);
}
function isEnteryComplete() {
    var textBoxes = document.querySelectorAll("form input[data-required-msg]");
    for (var i = 0; i < textBoxes.length; i++) {
        var currElem = textBoxes[i];
        var id = currElem.getAttribute("id");
        if (!validatePresence(id)) {
            return false;
        }
    }
    return true;
}
function validatePresence(elemID) {
    var elem = document.getElementById(elemID);
    if (!isPresent(elem)) {
        elem.nextElementSibling.innerHTML = elem.getAttribute("data-required-msg");
        return false;
    }
    if (isPresent(elem)) {
        if (elemID == "email") {
            if (!verifyEmail()) {
                return false;
            }
        }
        if (elemID == "password") {
            if (!verifyPassword()) {
                return false;
            }
        }
        if (elemID == "phone") {
            if (!verifyPhone()) {
                return false;
            }
        }
        elem.nextElementSibling.innerHTML = "*";
        return true;
    }
}
function isPresent(box) {
    if (box.value.trim() == "") {
        return false;
    }
    return true;
}
