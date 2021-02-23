/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

//What does it do?
//1. Accessibility - setting focus() point for the first field upon lading on page
//2. Job Role Filtering -  setting filter out for Others when clicked, allowing user to input data
//3. TShirt Options Filtering - setting filter to preselect TShirt Colors when a Tshirt theme is selected
//4. Cost Calculations - adjusting total price when activity is selected
//5. Payment Info - filtering out appropriate information upon selecting a payment type
//6. Form Validations - general form validation of fields and selections when user clicks on register

/*=========================
1. Accessibility
=========================*/
//Set focus on first inputfield
const inputText = document.querySelector('[type="text"]');
inputText.focus();
//Set highlights on activity selection
for(let i=0; i<activities.length; i++){
    activities[i].addEventListener('focus', e=>{
        e.target.parentNode.classList.add('focus');
    });
    activities[i].addEventListener('blur', e=>{
        e.target.parentNode.classList.remove('focus');
    });
}

/*=========================
2. Job Role filtering
=========================*/
//Declaring job roles variables
const jobTitle = document.querySelector('#title');
const otherJob = document.querySelector('#other-job-role');
const otherField = document.querySelector('OPTION');
//Filter of Job Role as Other
otherJob.style.display = 'none';
jobTitle.addEventListener('change', e=>{
    if(jobTitle.value === 'other'){
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
});

/*=========================
3. TShirt options filtering
=========================*/
//Declare TShirt option variables
const designOptions = document.querySelector('#design');
const colorOptions = document.querySelector('#color');
const jsPuns = document.querySelectorAll('option[data-theme="js puns"]');
const heartJS = document.querySelectorAll('option[data-theme="heart js"]');
//Filtering TShirt and Color Options upon selection
colorOptions.disabled = true;
designOptions.addEventListener('change', (e)=>{
    const element = e.target;
    colorOptions.disabled = false;
    colorOptions[0].innerHTML = 'Pick a color';

    if(element.value ==='js puns'){    
        colorOptions.value = 'Pick a color';
            for(let i = 0 ;i<heartJS.length; i++){
                heartJS[i].style.display = 'none';
            }
            for(let i = 0 ;i<jsPuns.length; i++){
                jsPuns[i].style.display = 'block';
            }
    } else if(element.value ==='heart js'){
        colorOptions.value = 'Pick a color';
            for(let i = 0 ;i<heartJS.length; i++){
                heartJS[i].style.display = 'block';
            }
            for(let i = 0 ;i<jsPuns.length; i++){
                jsPuns[i].style.display = 'none';
            }
    }
});

/*=========================
4. Cost calculations
=========================*/
//Declare activities and cost variables
const registeredActivities = document.querySelector('#activities');
const totalCost = document.querySelector('#activities-cost');
let totalPrice =0;
//Event listener on selection of activity and Total Price calculation
registeredActivities.addEventListener('change', e=>{
    const element = e.target;
    const dataCost = element.getAttribute('data-cost');
    const dataNum = + dataCost;

        if(element.checked){
            totalPrice += dataNum;
        } else if(!element.checked){
            totalPrice -= dataNum;
        }
    
    totalCost.innerHTML = `Total $:${totalPrice}`;
});

/*=========================
5. Payment Info
=========================*/
//Declare payment info variables
const paymentInfo = document.querySelector('.payment-methods');
const creditBox = document.querySelector('#credit-card');
const creditCard = document.querySelector('[value="credit-card"]');
const ccNum = document.querySelector('#cc-num');
const paypalSelect = document.querySelector('[value="paypal"]');
const bitcoinSelect = document.querySelector('[value="bitcoin"]');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
//Payment info and type filtering
creditCard.selected = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';

paymentInfo.addEventListener('change', e=>{
    if(creditCard.selected){
        creditBox.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if(paypalSelect.selected){
        creditBox.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else if(bitcoinSelect.selected){
        creditBox.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
});

/*=========================
6. Form Validations
=========================*/
//Declare form and label variables
const userName = document.querySelector('#name');
const emailAddress = document.querySelector('#email');
const paymentType = document.getElementById('payment');
const zipCode = document.querySelector('#zip');
const cvvCode= document.querySelector('#cvv');
const activityList = document.querySelectorAll('[type="checkbox"]');
const form = document.querySelector('[method="post"]');
//Function of checking invalid data
function dataInvalid(dataInput){
    const dataParent = dataInput.parentNode;
    dataParent.classList.add('not-valid');
    dataParent.classList.remove('valid');
    dataParent.lastElementChild.style.display = 'block';
}
//Function of checking valid data
function dataIsValid(dataInput){
    const dataParent = dataInput.parentNode;
    dataParent.classList.remove('not-valid');
    dataParent.classList.add('valid');
    dataParent.lastElementChild.style.display = 'none';
}
//Event listener on checking data input
form.addEventListener('submit' ,e=>{
    const element = e.target;
    let name = userName.value;
    let nameValidate = /^[a-zA-Z ]+$/.test(name);
        if(!nameValidate){
            e.preventDefault();
            dataInvalid(userName);
        } else {
            dataIsValid(userName);
        }

    let email = emailAddress.value;
    let emailValidate = /^[^@]+@[^@.]+\.[A-Z]+$/i.test(email);
        if(!emailValidate){
            e.preventDefault();
            dataInvalid(emailAddress);
        } else {
            dataIsValid(emailAddress);
        }

        if(paymentType.value ==="credit-card"){
            let card = ccNum.value;
            let cardValidate = /^[\d]{13,16}$/.test(card);
                if(!cardValidate){
                    e.preventDefault();
                    dataInvalid(ccNum);
                }else {
                    dataIsValid(ccNum);
                }

            let zip = zipCode.value;
            let zipValidate = /^[\d]{5}$/.test(zip);
                if(!zipValidate){
                    e.preventDefault();
                    dataInvalid(zipCode);
                }else {
                    dataIsValid(zipCode);
                }
        
            let cvv = cvvCode.value;
            let cvvValidate = /^[\d]{3}$/.test(cvv);
                if(!cvvValidate){
                    e.preventDefault();
                    dataInvalid(cvvCode);
                }else {
                    dataIsValid(cvvCode);
                }
        }
       
    if(totalPrice == 0){
        e.preventDefault();
        dataInvalid(totalCost);
    }else {
        dataIsValid(totalCost);
    }
});
