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
console.log(fieldsetInput);

userName.setAttribute('autofocus' , 'autofocus');

function createExtraDiv(){
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
        selectColor.options[0].selected = 'selected';
    }

    if(e.target.value === 'heart js'){
     
        for( i = 0 ; i < 3 ; i++ ){
            
            selectColor.options[i].style.display = 'none';
        }

        for( i = 3 ; i < selectColor.options.length ; i++){ 
            selectColor.options[i].style.display = 'block';
        }
        selectColor.options[3].selected = 'selected';
    }
});


fieldActivities.addEventListener('change' , () => {

    for( let i = 0 ; i < fieldsetInput.length ; i++){
        if( fieldsetInput[i].checked){
            console.log('yes');
        }
    }
    

});