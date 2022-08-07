import APIService from "./utils/api_service.js";
import {validateUserEmail,validateStringField} from "./utils/validate.js";

let next_click=document.querySelectorAll(".next_button");
let main_form=document.querySelectorAll(".main");
let step_list = document.querySelectorAll(".progress-bar li");
let num = document.querySelector(".step-number");
let formnumber=0;

next_click.forEach(function(next_click_form){
    next_click_form.addEventListener('click',function(){
        if(!validateform()){
            return false
        }
       formnumber++;
       updateform();
       progress_forward();
       contentchange();
    });
});

let back_click=document.querySelectorAll(".back_button");
back_click.forEach(function(back_click_form){
    back_click_form.addEventListener('click',function(){
       formnumber--;
       updateform();
       progress_backward();
       contentchange();
    });
});

let username=document.querySelector("#user_name");
let shownname=document.querySelector(".shown_name");


let submit_click=document.querySelectorAll(".submit_button");
submit_click.forEach(function(submit_click_form){
    submit_click_form.addEventListener('click',function(){
       shownname.innerHTML= personalInfo.name;
       formnumber++;
       updateform();
    });
});


function updateform(){
    main_form.forEach(function(mainform_number){
        mainform_number.classList.remove('active');
    })
    main_form[formnumber].classList.add('active');
}

function progress_forward(){
    // step_list.forEach(list => {

    //     list.classList.remove('active');

    // });
    getInfoProcess[formnumber-1](infos[formnumber-1]);
    num.innerHTML = formnumber+1;
    step_list[formnumber].classList.add('active');
}

function progress_backward(){

    resetInputField(infos[formnumber+1])
    let form_num = formnumber+1;
    step_list[form_num].classList.remove('active');
    num.innerHTML = form_num;
}

let step_num_content=document.querySelectorAll(".step-number-content");

 function contentchange(){
     step_num_content.forEach(function(content){
        content.classList.remove('active');
        content.classList.add('d-none');
     });
     step_num_content[formnumber].classList.add('active');

     console.log(infos);
 }


function validateform(){
    let validate=true;
    let validate_inputs=document.querySelectorAll(".main.active input");
    validate_inputs.forEach(function(vaildate_input){
        vaildate_input.classList.remove('warning');
        if(vaildate_input.hasAttribute('require')){
            if(vaildate_input.value.length==0){
                validate=false;
                vaildate_input.classList.add('warning');
            }
        }
    });
    return validate;

}

let personalInfo = {
    name: "",
    phone: ""
}
let pickingAddress = {
    city: "",
    district: "",
    ward: "",
    street: "",
    home: ""
};
let arrivingAddress = {
    city: "",
    district: "",
    ward: "",
    street: "",
    home: ""
};
let infos = [personalInfo, pickingAddress,arrivingAddress];

function resetInputField(fields){
    Object.keys(fields).forEach((field) => fields[field] = "");
}

const getInfoProcess =[
    (personalInfo) => {
        personalInfo.name = $("#input_name").val();
        personalInfo.phone = $("#input_phone").val();
    },
    (pickingAddress) => {
        pickingAddress.city = $("#input_p_city").val();
        pickingAddress.district = $("#input_p_district").val();
        pickingAddress.ward = $("#input_p_ward").val();
        pickingAddress.street = $("#input_p_street").val();
        pickingAddress.home = $("#input_p_home").val();
    },
    (address) => {
        address.city = $("#input_a_city").val();
        address.district = $("#input_a_district").val();
        address.ward = $("#input_a_ward").val();
        address.street = $("#input_a_street").val();
        address.home = $("#input_a_home").val();
    }
];
