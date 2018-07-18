const userName = document.getElementById('name');
const basicInfoFieldSet = document.querySelector('fieldset');
const selectTitle = document.getElementById('title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const shirt = document.getElementsByClassName('shirt')[0];
const design = document.getElementById('design');
const color = document.getElementById('color');
const fieldActivities = document.querySelector('.activities');
const fieldsetInput = fieldActivities.querySelectorAll('input');
const label = fieldActivities.getElementsByTagName('label');
const creditCardDiv = document.getElementById('credit-card');
const paymentFieldset = document.getElementsByTagName('fieldset')[3];
const payPalDiv = paymentFieldset.children[4];
const bitcoinDiv = paymentFieldset.children[5]

payPalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

let total = 0;
var substring = '';

userName.setAttribute('autofocus', 'autofocus');

function createExtraDiv() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Your job role";
    input.id = "other-title";
    input.name = 'title';
    basicInfoFieldSet.appendChild(input);
    input.style.display = 'none';
    return input;
}

createExtraDiv();

selectTitle.addEventListener('change', (e) => {

    const input = document.querySelector('[placeholder = "Your job role"]');
    if (e.target.value === 'other') {
        input.style.display = 'block';
    }

    else {
        // const input = document.querySelector('[placeholder = "Your job role"]');
        if (input.style.display === 'block') {
            input.style.display = 'none';
        }
    }
});

selectDesign.addEventListener('change', (e) => {

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

function addTotalElement() {
    const label = document.createElement('label');
    label.id = "totalamount";
    fieldActivities.appendChild(label);
}
addTotalElement();



// Disabling events of same days and at the same time

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

paymentFieldset.addEventListener('change', (e) => {

    if (e.target.value === 'credit card') {
        payPalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        creditCardDiv.style.display = 'block';
    }

    if (e.target.value === 'paypal') {
        creditCardDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        payPalDiv.style.display = 'block';
    }

    if (e.target.value === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        payPalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    }

});