const form = document.querySelector('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeat-password');

//Diplay error message if input field is empty
const showErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
};

//Show success on validation
const showSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

//Check for required fields
const checkRequiredFields = (inputs) => {
    inputs.forEach(input => {
        if(input.value.trim() === "") {
            showErrorFor(input, `${getFieldName(input)} is required`)
        } else  {
            showSuccessFor(input);
        }
    });
};

//Get field name from id
const getFieldName = (input) => {
    let fieldName = input.id;
    if(fieldName.includes('-')) {
        fieldName = fieldName.split("-").join(" ");
    }
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
};

//Validate email address
const ValidateEmail = (input) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.value.trim() !== "") {
        if(regex.test(input.value.trim())) {
            showSuccessFor(input);
        } else {
            showErrorFor(input, `${getFieldName(input)} is not valid`);
        }
    } else {
        showErrorFor(input, `${getFieldName(input)} is required`);
    }
};

//Check for password match

const matchPassword = (input1, input2) => {
    if(input2.value !== "" && input1.value !== input2.value) {
        showErrorFor(input2, "Passwords do not match");
    }
};

//Check field input length
const checkLength = (input, min, max) => {
    if(input.value.trim() !== "") {
        if(input.value.length < min) {
            showErrorFor(input, `${getFieldName(input)} cannot be less than ${min} characters`);
        } else if (input.value.length > max) {
            showErrorFor(input, `${getFieldName(input)} cannot be more than ${max} characters`)
        } else {
            showSuccessFor(input);
        }
    } else {
        showErrorFor(input, `${getFieldName(input)} is required`);
    }
};

//Listening for form data submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequiredFields([userName, email, password, repeatPassword]);
    checkLength(userName, 3, 15);
    checkLength(password, 8, 20);
    ValidateEmail(email);
    matchPassword(password, repeatPassword);
});
