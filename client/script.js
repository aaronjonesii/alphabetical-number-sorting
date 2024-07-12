// DOM Elements
const numbersForm = document.getElementById('numbersForm');
const numbersInput = document.getElementById('numbersInput');
const resultsContainer = document.getElementById('results');
const inputErrorContainer = document.getElementById('input-error');

// Form submission event listener
numbersForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    showInputError(false);

    const inputNumbers = numbersInput.value.trim();

    if (!isValid(inputNumbers)) {
        showInputError(
            true,
            'Invalid text input. Only whole numbers and commas are valid input values. Example: 1,2,3,4,5'
        );

        return;
    }

    try {
        const response = await fetch(
            'http://localhost:3000/api/sort',
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
        showInputError(true, error);

        console.error('Error sorting input value', error);
    }
});

function isValid(text) {
    const regex = /^[\d,-]+$/;

    return text.match(regex);
}

function showResults(results) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    results.forEach((item) => {
        const listItem = document.createElement('li');

        if (item.image) {
            const img = createImgElement(item);

            listItem.appendChild(img);
        } else {
            listItem.textContent = item.text;
        }

        resultsContainer.appendChild(listItem);
    });
}

function showInputError(show, errorMessage) {
    if (show) {
        inputErrorContainer.textContent = errorMessage || 'Invalid text input. Only whole numbers and commas are valid input values. Example: 1,2,3,4,5';
        inputErrorContainer.classList.remove('hidden');
    } else {
        inputErrorContainer.classList.add('hidden');
    }
}

function createImgElement(item) {
    const img = document.createElement('img');

    img.src = 'imgs/vegeta-over-9000.webp';

    img.style.width = '100%';

    img.style.maxWidth = '100px';

    img.style.height = 'auto';

    img.style.borderRadius = '1rem';

    img.alt = item.text;

    img.title = item.text;

    return img;
}
