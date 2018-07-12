const userName = document.getElementById('name');
const fieldSet = document.querySelector('fieldset');
const selectTitle = document.getElementById('title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const shirt = document.getElementsByClassName('shirt')[0];
const design = document.getElementById('design');
const color = document.getElementById('color');
const fieldActivities = document.querySelector('.activities');
const fieldsetInput = fieldActivities.querySelectorAll('input');
const label = fieldActivities.getElementsByTagName('label');


let total = 0;

userName.setAttribute('autofocus', 'autofocus');

function createExtraDiv() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Your job role";
    input.id = "other-title";
    input.name = 'title';
    fieldSet.appendChild(input);
    input.style.display = 'none';
    return input;
}

createExtraDiv();

selectTitle.addEventListener('change', (e) => {

    if (e.target.value === 'other') {
        const input = document.querySelector('[placeholder = "Your job role"]');
        input.style.display = 'block';
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
            console.log(total);
        }
        const lastLabel = document.getElementById('totalamount');
        lastLabel.textContent = total.toString();
        
    });
}

function addTotalElement(){
    const label = document.createElement('label');
    label.id = "totalamount";
    fieldActivities.appendChild(label);
}
addTotalElement();


