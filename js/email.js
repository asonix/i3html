/*
author:
    ???
last edited:
    ???
source:
        http://www.html-form-guide.com/contact-form/php-email-contact-form.html
*/
function validateForm() {
    var frmvalidator = new Validator("contactform");
    frmvalidator.addValidation("name","req","Please provide your name.");
    frmvalidator.addValidation("email","req","Please provide your email.");
    frmvalidator.addValidation("email","email","Please enter a valid email address");
}
