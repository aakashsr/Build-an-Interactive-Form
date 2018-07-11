const userName = document.getElementById('name');
const fieldSet = document.querySelector('fieldset');
const selectTitle = document.getElementById('title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const shirt = document.getElementsByClassName('shirt')[0];
const design = document.getElementById('design');
const color = document.getElementById('color');

userName.setAttribute('autofocus' , 'autofocus');

function createExtraDiv(){
const input = document.createElement('input');
input.type = 'text';
input.placeholder = "Your job role";
input.name = 'title';
fieldSet.appendChild(input);
input.style.display = 'none';
return input;
}

createExtraDiv();

selectTitle.addEventListener('change' , (e) => {

    if(e.target.value === 'other'){
        const input = document.querySelector('[placeholder = "Your job role"]');
        input.style.display = 'block';
    }
});

selectDesign.addEventListener('change' , (e) => {
   
    if(e.target.value === 'js puns'){
        for( i = 3 ; i < selectColor.options.length ; i++){ 
            selectColor.options[i].style.display = 'none';
        }
        for( i = 0 ; i < 3 ; i++ ){
            selectColor.options[i].style.display = 'block';
        }
    }

    if(e.target.value === 'heart js'){
        var x =selectColor.selectedIndex;
        var y =selectColor.options;
        y[x].setAttribute('disabled' ,'true');
        for( i = 0 ; i < 3 ; i++ ){
            selectColor.options[i].style.display = 'none';
        }

        for( i = 3 ; i < selectColor.options.length ; i++){ 
            selectColor.options[i].style.display = 'block';
        }


    }
});