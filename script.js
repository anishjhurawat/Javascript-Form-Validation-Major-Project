// Select the buttons and form steps
const prevButton = document.querySelector('.btn-prev');
const nextButton = document.querySelector('.btn-next');
const submitButton = document.querySelector('.btn-submit');
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.form-step');

let active = 1;

// Event listener for the Next button
nextButton.addEventListener('click', () => {
    if (validateStep()) {
        active++;
        if (active > steps.length) {
            active = steps.length;
        }
        updateProgress();
    }
});

// Event listener for the Previous button
prevButton.addEventListener('click', () => {
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
});

// Event listener for the Submit button
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (validateStep()) {
        alert('Form submitted successfully!');
    }
});

// Function to update the progress bar and form steps
const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i === (active - 1)) {
            step.classList.add('active');
            form_steps[i].classList.add('active');
        } else {
            step.classList.remove('active');
            form_steps[i].classList.remove('active');
        }
    });

    prevButton.disabled = active === 1;
    nextButton.disabled = active === steps.length;
    submitButton.style.display = active === steps.length ? 'block' : 'none';
};

// Function to validate the current step
const validateStep = () => {
    let valid = true;
    const inputs = form_steps[active - 1].querySelectorAll('input');
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;

    inputs.forEach(input => {
        // Remove previous warning message
        const warningMessage = input.nextElementSibling;
        if (warningMessage && warningMessage.classList.contains('warning-message')) {
            warningMessage.remove();
        }

        // Check if input is empty or invalid based on specific rules
        if (input.required && !input.value.trim()) {
            valid = false;
            input.classList.add('is-invalid');
            showWarning(input, 'This field is required');
        } else {
            input.classList.remove('is-invalid');
            switch (input.name) {
                case 'firstName':
                case 'lastName':
                    if (input.value.length < 5) {
                        valid = false;
                        input.classList.add('is-invalid');
                        showWarning(input, 'Name must be at least 5 characters long');
                    }
                    break;
                case 'email':
                    if (!input.value.includes('@')) {
                        valid = false;
                        input.classList.add('is-invalid');
                        showWarning(input, 'Please enter a valid email address');
                    }
                    break;
                case 'phone':
                    if (input.value === '123456789' || input.value.length !== 10 || isNaN(input.value)) {
                        valid = false;
                        input.classList.add('is-invalid');
                        showWarning(input, 'Please enter a valid 10-digit phone number');
                    }
                    break;
                case 'password':
                    if (input.value.toLowerCase() === 'password' || input.value.length < 8 || input.value.toLowerCase() === firstName.toLowerCase() || input.value.toLowerCase() === lastName.toLowerCase()) {
                        valid = false;
                        input.classList.add('is-invalid');
                        showWarning(input, 'Password must be at least 8 characters long and cannot be "password" or your name');
                    }
                    break;
                case 'confirmPassword':
                    const password = document.querySelector('input[name="password"]').value;
                    if (input.value !== password) {
                        valid = false;
                        input.classList.add('is-invalid');
                        showWarning(input, 'Passwords do not match');
                    }
                    break;
                case 'declaration':
                    if (!input.checked) {
                        valid = false;
                        showWarning(input, 'You must accept the declaration');
                    }
                    break;
            }
        }
    });

    return valid;
};

// Function to show warning messages
const showWarning = (input, message) => {
    const warningMessage = document.createElement('div');
    warningMessage.classList.add('warning-message');
    warningMessage.textContent = message;
    warningMessage.style.color = 'red';
    warningMessage.style.fontSize = '12px';
    warningMessage.style.marginTop = '5px';
    input.insertAdjacentElement('afterend', warningMessage);
};

// Attach onchange event listener to all inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
        if (input.value.trim()) {
            input.classList.remove('is-invalid');
            const warningMessage = input.nextElementSibling;
            if (warningMessage && warningMessage.classList.contains('warning-message')) {
                warningMessage.remove();
            }
        }
    });
});

// Initial progress update
updateProgress();
