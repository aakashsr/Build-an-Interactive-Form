const userName = document.getElementById('name');
const userEmail = document.getElementById('mail');
const basicInfoFieldSet = document.querySelector('fieldset');
const selectTitle = document.getElementById('title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorDiv = document.getElementById('colors-js-puns');
const shirt = document.getElementsByClassName('shirt')[0];
const design = document.getElementById('design');
const color = document.getElementById('color');
const fieldActivities = document.querySelector('.activities');
const fieldsetInput = fieldActivities.querySelectorAll('input');
const label = fieldActivities.getElementsByTagName('label');
const creditCardDiv = document.getElementById('credit-card');
const paymentFieldset = document.getElementsByTagName('fieldset')[3];
const payPalDiv = paymentFieldset.children[4];
const bitcoinDiv = paymentFieldset.children[5];
const button = document.getElementsByTagName('button')[0];
const paymentDiv = document.getElementById('payment');
const paymentOptions = paymentDiv.getElementsByTagName('option');
const ccNum = document.getElementById('cc-num');
const cvvCodeNum = document.getElementById('cvv');
const zipCodeNum = document.getElementById('zip');
var activitiesLegend = fieldActivities.querySelector('legend');
var substring = '';
let total = 0;
var spanElement = document.querySelector('span');

colorDiv.style.display = 'none';
payPalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

const input = document.querySelector('[placeholder = "Your job role"]');
input.style.display = 'none';

userName.setAttribute('autofocus', 'autofocus');

// Displaying 'div' when user chooses the 'other' option and also
// hiding it if user changes his mind and chooses another option

selectTitle.addEventListener('change', (e) => {

    if (e.target.value === 'other') {
        input.style.display = 'block';
    } else {
        if (input.style.display === 'block') {
            input.style.display = 'none';
        }
    }
});

// Displaying the color option as per the 'Design' chosen
selectDesign.addEventListener('change', (e) => {
    colorDiv.style.display = 'block';
    if (e.target.value === 'js puns') {

        for (i = 3; i < selectColor.options.length; i++) {
            selectColor.options[i].style.display = 'none';
        }
        for (i = 0; i < 3; i++) {
            selectColor.options[i].style.display = 'block';
        }
        selectColor.options[0].selected = 'selected';
    }

    if (e.target.value === 'heart js') {

        for (i = 0; i < 3; i++) {

            selectColor.options[i].style.display = 'none';
        }

        for (i = 3; i < selectColor.options.length; i++) {
            selectColor.options[i].style.display = 'block';
        }
        selectColor.options[3].selected = 'selected';
    }
});

// Calculating the total cost for registering

for (let i = 0; i < label.length; i++) {
    fieldsetInput[i].addEventListener('click', () => {

        const text = label[i].textContent;
        if (fieldsetInput[i].checked) {
            total += parseInt(text.substring(text.indexOf('$') + 1, text.length));
        } else {
            total -= parseInt(text.substring(text.indexOf('$') + 1, text.length));
        }
        const lastLabel = document.getElementById('totalamount');
        lastLabel.textContent = '$' + total.toString();

    });
}

// Creating an extra 'label' element to display total cost when user starts checking for activities
function addTotalElement() {
    const label = document.createElement('label');
    label.id = "totalamount";
    fieldActivities.appendChild(label);
}
addTotalElement();

// Disabling activities on the same day and at the same time when user selects an activity

fieldActivities.addEventListener('change', (e) => {

    //Select the label text in a variable sString
    const sString = event.target.parentNode.textContent;
    //Then extract that specific part from the label which you want to match in other labels
    const partOfString = sString.substring(sString.indexOf('Tuesday'), sString.length - 6);
    //Now throug all the label and search if the extracted part found  in any label[i].textContent 
    //Make sure , it should not match to its own
    for (let i = 0; i < fieldsetInput.length; i++) {
        if (label[i].textContent.indexOf(partOfString) > -1 && label[i].textContent !== sString) {
            //if found, then check whether its checked or not
            if (e.target.checked) {
                fieldsetInput[i].disabled = true;
            } else {
                fieldsetInput[i].disabled = false;
            }
        }
    }
});

//Checking the mode of payment and showing the corresponding result as per mode
paymentFieldset.addEventListener('change', (e) => {

    if (e.target.value === 'credit card') {
        hidePayPal();
        hideBitCoin();
        creditCardDiv.style.display = 'block';
    }

    if (e.target.value === 'paypal') {
        hideCreditCard();
        hideBitCoin();
        payPalDiv.style.display = 'block';
    }

    if (e.target.value === 'bitcoin') {
        hideCreditCard();
        hidePayPal();
        bitcoinDiv.style.display = 'block';
    }
});

function hidePayPal() {
    payPalDiv.style.display = 'none';
}

function hideBitCoin() {
    bitcoinDiv.style.display = 'none';
}

function hideCreditCard() {
    creditCardDiv.style.display = 'none';
}

// Defining validation methods

function valEmail() {
    return (/^[^@]+@[^@.]+\.[a-z]+$/.test(userEmail.value));
}

function valCcNumber() {
    return (/^\d{13,15}$/.test(ccNum.value));
}

function valZipCode() {
    return (/^\d{5}$/.test(zipCodeNum.value));
}

function valCvvNumber() {
    return (/^\d{3}$/.test(cvvCodeNum.value));
}

//Checking if the user name field is not empty
function checkUserName() {
    if (userName.value === "") {
        alert("Please enter your username");
        return false;
    } else {
        return true;
    }
}

//Checking if the user email field is not emtpy and also formatted as per rule
function checkUserEmail() {

    if (userEmail.value === '') {
        alert("Please enter you Email Address!");   //if empty show this message
        return false;
    } else {
        if (valEmail()) {
            return true;
        } else {
            alert("Please enter your Email Address in a correct format");       // if not formatted well , show this message
            return false;
        }
    }
}

// Using closure to make count variable local so that , when user uncheck the checkbox 
//after checking it , value of count resets to 0 and message will appear again.If we defined it globally , once we 
//checked the checkbox , message will never appear again even if uncheck all the checkboxes because value cannot be 0 again.

function checkBoxCount() {
    var count = 0;
    return function () {
        for (let i = 0; i < fieldsetInput.length; i++) {
            if (fieldsetInput[i].checked) {
                count += 1;
            }
        }
        return count;
    }
}

function checkCheckbox() {
    var checkboxvalue = checkBoxCount(); //checkboxvalue is now closure
    if (checkboxvalue() === 0) {
        alert('Please select atleast one activity');
        return false;
    }
    return true;
}

//Checking the credit card field is not empty and also input is in proper range
function checkCcNumber() {

    if (ccNum.value === '') {
        alert("Please enter your Credit Card Number");  //if empty , show this message
        return false;
    } else {
        if (valCcNumber()) {
            return true;
        } else {
            alert("Your Credit Card number should be between 13-15 digit"); //if not formatted well , show this message
            return false;
        }
    }
}

//Checking the zipcode field is not empty and also input is in proper range
function checkZipCode() {

    if (zipCodeNum.value === '') {
        alert("Please enter your Zip Code Number");     //if empty , show this message
        return false;
    } else {
        if (valZipCode()) {
            return true;
        } else {
            alert("Your Zip Code number should be of 5 digit");     //if not formatted well , show this message
            return false;
        }
    }
}

//Checking the CVV number field is not empty and also input is in proper range
function checkCvvNumber() {

    if (cvvCodeNum.value === '') {
        alert("Please enter your CVV Number");      //if empty , show this message
        return false;
    } else {
        if (valCvvNumber()) {
            return true;
        } else {
            alert("Your CVV number should be of 3 digit");       //if not formatted well , show this message
            return false;
        }
    }
}

creditCardDiv.style.display = 'block';

//Preventing the page from submiting if input is empty or not well formatted
button.addEventListener('click', (event) => {
    if (!checkUserName()) {
        event.preventDefault();
    } else if (!checkUserEmail()) {
        event.preventDefault();

    } else if (!checkCheckbox()) {
        event.preventDefault();

    } else if (creditCardDiv.style.display === 'block') {

        if (!checkCcNumber()) {
            event.preventDefault();
        } else if (!checkZipCode()) {
            event.preventDefault();
        } else if (!checkCvvNumber()) {
            event.preventDefault();
        }
    }
    highlightElements();
});

// function to highlight the input fields which are not filled or well formatted
function highlightElements() {
    if (userName.value === '') {
        userName.style.border = '1px #f00 solid';
        userName.previousElementSibling.style.color = '#f00';
        userName.style.boxShadow = '0 0 4px 0 #f00';
    } else {
        userName.style.border = '2px solid #c1deeb';
        userName.style.boxShadow = 'none';
        userName.previousElementSibling.style.color = '#184f68';
    }

    if (userEmail.value === '' || !valEmail()) {
        userEmail.style.border = '1px #f00 solid'
        userEmail.previousElementSibling.style.color = '#f00';
        userEmail.style.boxShadow = '0 0 4px 0 #f00';
    } else {
        userEmail.style.border = '2px solid #c1deeb';
        userEmail.style.boxShadow = 'none';
        userEmail.previousElementSibling.style.color = '#184f68';
    }

    var checkboxvalue2 = checkBoxCount();
    if (checkboxvalue2() == 0 ) {
        activitiesLegend.style.color = '#f00';
    } else {
        activitiesLegend.style.color = '#184f68';
    }

    if (creditCardDiv.style.display === 'block') {

        if (ccNum.value === '' || !valCcNumber()) {
            ccNum.style.border = '1px #f00 solid';
            ccNum.previousElementSibling.style.color = '#f00';
            ccNum.style.boxShadow = '0 0 4px 0 #f00'
        } else {
            ccNum.style.border = '2px solid #c1deeb';
            ccNum.style.boxShadow = 'none';
            ccNum.previousElementSibling.style.color = '#184f68';
        }

        if (zipCodeNum.value === '' || !valZipCode()) {
            zipCodeNum.style.border = '1px #f00 solid';
            zipCodeNum.previousElementSibling.style.color = '#f00';
            zipCodeNum.style.boxShadow = '0 0 4px 0 #f00'

        } else {
            zipCodeNum.style.border = '2px solid #c1deeb';
            zipCodeNum.style.boxShadow = 'none';
            zipCodeNum.previousElementSibling.style.color = '#184f68';
        }

        if (cvvCodeNum.value === '' || !valCvvNumber()) {
            cvvCodeNum.style.border = '1px #f00 solid';
            cvvCodeNum.previousElementSibling.style.color = '#f00';
            cvvCodeNum.style.boxShadow = '0 0 4px 0 #f00'

        } else {
            cvvCodeNum.style.border = '2px solid #c1deeb';
            cvvCodeNum.style.boxShadow = 'none';
            cvvCodeNum.previousElementSibling.style.color = '#184f68';
        }
    }
}

//real time validation of email
userEmail.addEventListener('keyup', () => {

    if ((/^[^@]+@[^@.]+\.[a-z]+$/.test(userEmail.value)) == false) {
        spanElement.style.visibility = 'visible';
    } else {
        spanElement.style.visibility = 'hidden';
    }
});