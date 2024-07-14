const express = require('express');
const cors = require('cors');
const ntw = require('number-to-words');

const app = express();

app.use(cors());
app.use(express.json());

const toTitleCase = (str) => str.replace(
    /\w\S*/g,
    (text) => {
        return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    }
);

const isValidInput = (numbersText) => numbersText?.match(/^[\d,-]+$/);

const extractNumbers = (numbersText) => numbersText.split(',')
    .filter((n) => !!n).map(Number);

const convertNumberToWordObject = (num) => {
    const numText = ntw.toWords(num)
        // remove commas
        .replace(/,/g, '')
        // remove hyphens
        .replace(/-/g, ' ')
        // replace minus with negative
        .replace(/minus/g, 'negative');

    return {
        image: num > 9000,
        num,
        text: toTitleCase(numText),
    };
};

app.post('/api/sort', (req, res) => {
    const numbersText = req.body.numbers;

    if (!isValidInput(numbersText)) {
        return res.status(400).json(
            'Invalid text input. Only whole numbers and commas are valid input values. Example: 1,2,3,4,5'
        );
    }

    const numbers = extractNumbers(numbersText);

    const sortedWords = numbers.map(convertNumberToWordObject)
        .sort((a, b) => a.text.localeCompare(b.text));

    res.json({ sortedWords });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

