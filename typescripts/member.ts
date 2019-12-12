window.onload = function(){
    let regform = document.getElementById("member_form");
    regform.onsubmit = main;
}


/**
 * Checks form for valid imput
 * If all data is valid, form will be submitted.
 * If any data is invalid, error message(s) will be displayed
 */
function main(){
    let isValid = true;

    if(!isEnteryComplete()){ // do all required fields contain user input
        isValid = false;
    }
    if(!isCorporateSelected()){ // individual or corporate membership
        if(!isCompanyPresent()){  
            isValid = false;
        }
    }
    if(!isValid){
        event.preventDefault(); // prevents submmission if invalid
    }
}


/**
 * Confirms email is valid && displays appropriate message.
 */
function verifyEmail():boolean{
    let email = <HTMLInputElement>document.getElementById("email");
    
    if(!isEmailValid(email.value)){
        let errMsg = email.nextElementSibling;
        errMsg.innerHTML = "Format must be: qq@qq.qq";
        return false;
    }
    else{
        let errMsg = email.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
}

/**
 * Returns true for valid email
 * Ensure email has mailbox name, @ symbol, & domain name.
 * @param email the email to be validated
 */
function isEmailValid(email:string):boolean{
    let emailPattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    return emailPattern.test(email);
}


/**
 * Verifies password length and displays the correct error message
 */
function verifyPassword():boolean{
    let password = <HTMLInputElement>document.getElementById("password");
    let verifyPassword = <HTMLInputElement>document.getElementById("verify");
    if(password.value.length < 6){
        let errMsg = password.nextElementSibling;
        errMsg.innerHTML = "Password is too short";
        return false;
    }
    else if(password.value != verifyPassword.value){
        let errMsg = password.nextElementSibling;
        errMsg.innerHTML = "Password does not match entry below";
        return false;
    }
    else {
        let errMsg = password.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
    
}


/**
 * Activates company name textbox if corporate checked
 */
function isCorporateSelected():boolean{
    let corpChecked = <HTMLInputElement>document.getElementById("corporate");
    let corpName = <HTMLInputElement>document.getElementById("company_name"); 
    corpName.disabled = corpChecked.checked? false:true;

    if(!corpName.disabled){
        corpName.focus();
        return false;
    }
    return true;
}

/**
 * Checks company name textbox is contains user input
 */
function isCompanyPresent():boolean{
    let companyName = <HTMLInputElement>document.getElementById("company_name");

    //Checks if theres input in the Company Name textbox
    if(companyName && companyName.value){
        let errMsg = companyName.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
    else{
        let errMsg = companyName.nextElementSibling
        errMsg.innerHTML = "Company Name Required";
        return false;
    }

}


/**
 * Confirms phone number is valid && displays appropriate message.
 */
function verifyPhone():boolean{
    let phone = <HTMLInputElement>document.getElementById("phone");

    if(!isPhoneValid(phone.value)){
        let errMsg = phone.nextElementSibling;
        errMsg.innerHTML = "Format must be: 555-555-5555";
        return false;
    }
    else{
        let errMsg = phone.nextElementSibling;
        errMsg.innerHTML = "*";
        return true;
    }
}


/**
 * Returns true for valid phone number
 * Ensures phone as the proper number of digits
 * Ignores dashes &/or parenthesis
 * @param phone The phone number to be validated
 */
function isPhoneValid(phone:string):boolean{
    let phonePattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;
    return phonePattern.test(phone);
}


/**
 * Iterate through all req'd inputs & check for input(any)
 */
function isEnteryComplete(){
    let textBoxes = document.querySelectorAll("form input[data-required-msg]");
    for (let i = 0; i < textBoxes.length; i++){
        let currElem = textBoxes[i];
        let id = currElem.getAttribute("id");
        if(!validatePresence(id)){
            return false;
        }
    }
    return true;
}


/**
 * Validates an <input type="text"> for a value, if not error msg displayed and false is returned
 * @param elemID The ID of the input, textbox 
 * @param errMsg The error message to display in a sibling span of the input
 */
function validatePresence(elemID:string):boolean{
    let elem = <HTMLInputElement>document.getElementById(elemID);
    if(!isPresent(elem)){
        elem.nextElementSibling.innerHTML = elem.getAttribute("data-required-msg");
        return false;
    }
    if(isPresent(elem)){
        if(elemID == "email"){ // Verify Email
            if(!verifyEmail()){
                return false;
            }
        }
        
        if(elemID == "password"){ // Verify Password
            if(!verifyPassword()){
                return false;
            }
        }

        if(elemID == "phone"){ // Verify Phone
            if(!verifyPhone()){
                return false;
            }
        }
        elem.nextElementSibling.innerHTML = "*";
        return true;
    }
}


/**
 * Checks <input type="text"> is not (empty or whitespace)
 * @param box 
 */
function isPresent(box:HTMLInputElement):boolean{
    // let data:string = box.value;
    // if(data.trim() == ""){
    //     return false;
    // }
    // return true;
    if(box.value.trim() == ""){
        return false
    }
    return true;
}