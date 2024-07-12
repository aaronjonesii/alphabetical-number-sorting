// Constants
const OVER_9000_IMAGE_SRC = 'imgs/vegeta-over-9000.webp';
const API_ENDPOINT = 'http://localhost:3000/api/sort';

// DOM Elements
const numbersForm = document.getElementById('numbersForm');
const numbersInput = document.getElementById('numbersInput');
const resultsContainer = document.getElementById('results');
const inputErrorContainer = document.getElementById('input-error');

// Form submission event listener
numbersForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearResultsAndError();

    const inputNumbers = numbersInput.value.trim();

    if (!isValidInput(inputNumbers)) {
        showInputError('Invalid text input. Only whole numbers and commas are valid input values. Example: 1,2,3,4,5');

        return;
    }

    try {
        const response = await fetch(
            API_ENDPOINT,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numbers: inputNumbers }),
            },
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        showResults(data.sortedWords);
    } catch (error) {
        showInputError(`Error: ${error.message}`);

        console.error('Error sorting input value', error);
    }
});

function isValidInput(text) {
    const regex = /^[\d,-]+$/;

    return text.match(regex);
}

function showResults(results) {
    results.forEach((item) => {
        return resultsContainer.appendChild(createListItem(item));
    });

    resultsContainer.classList.remove('hidden');
}

function showInputError(message) {
    inputErrorContainer.textContent = message;

    inputErrorContainer.classList.remove('hidden');
}

function createListItem(item) {
    const listItem = document.createElement('li');

    if (item.image) {
        listItem.appendChild(createImageElement(item.text));
    } else {
        listItem.textContent = item.text;
    }

    return listItem;
}

function createImageElement(altText) {
    const img = document.createElement('img');

    img.src = OVER_9000_IMAGE_SRC;

    img.style.width = '100%';

    img.style.maxWidth = '100px';

    img.style.height = 'auto';

    img.style.borderRadius = '1rem';

    img.alt = altText;

    img.title = altText;

    return img;
}

function clearResultsAndError() {
    resultsContainer.innerHTML = '';

    resultsContainer.classList.add('hidden');

    inputErrorContainer.classList.add('hidden');
}
