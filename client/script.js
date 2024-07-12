// DOM Elements
const numbersForm = document.getElementById('numbersForm');
const numbersInput = document.getElementById('numbersInput');
const resultsContainer = document.getElementById('results');
const inputErrorContainer = document.getElementById('input-error');

// Form submission event listener
numbersForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    showInputError(false);
    showResults(false);

    const inputNumbers = numbersInput.value.trim();

    if (!isValid(inputNumbers)) {
        // Inform the text was not a valid input
        // Show example of valid input with explanation of what is valid
        inputErrorContainer.textContent = 'Invalid text input. Only whole numbers and commas are valid input values. Example: 1,2,3,4,5';
        showInputError(true);
    }

    console.debug('Send input value to server', inputNumbers);

    // Send text to server and receive results
});

function isValid(text) {
    const regex = /^[\d,-]+$/;

    return text.match(regex);
}

function resetNumbersInput() {
    numbersInput.value = '';
}

function showResults(show) {
    if (show) {
        resultsContainer.classList.remove('hidden');
    } else {
        resultsContainer.classList.add('hidden');
    }
}

function showInputError(show) {
    if (show) {
        inputErrorContainer.classList.remove('hidden');
    } else {
        inputErrorContainer.classList.add('hidden');
    }
}
