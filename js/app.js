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

// Displaying the color option as per the 'Desing' chosen
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

    const sString = event.target.parentNode.textContent;
    const partOfString = sString.substring(sString.indexOf('Tuesday'), sString.length - 6);

    for (let i = 0; i < fieldsetInput.length; i++) {
        if (label[i].textContent.indexOf(partOfString) > -1 && label[i].textContent !== sString) {
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

    if (valEmail()) {
        return true;
    } else {
        alert("Please enter your email in valid format");
        return false;
    }
}

//Checking if atleast one of the checkbox has been checked 

var count = 0;

function checkCheckbox() {

    for (let i = 0; i < fieldsetInput.length; i++) {
        if (fieldsetInput[i].checked) {
            count += 1;
        }
    }
    if (count === 0) {
        alert('Please select atleast one activity');
        return false;
    }
    return count;
}

//Checking the credit card field is not empty and also in proper range
function checkCcNumber() {

    if (valCcNumber()) {
        return true;
    } else {
        alert("plese enter a valid credit card number");
        return false;
    }
}

//Checking the zipcode field is not empty and also in proper range
function checkZipCode() {

    if (valZipCode()) {
        return true;
    } else {
        alert("plese enter a valid zip code");
        return false;
    }
}

//Checking the ccc number field is not empty and also in proper range
function checkCvvNumber() {

    if (valCvvNumber()) {
        return true;
    } else {
        alert("plese enter a valid cvv number");
        return false;
    }
}

creditCardDiv.style.display = 'block';

button.addEventListener('click', (event) => {
    // const checkBox = checkCheckbox();
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

    if (count === 0) {
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