const express = require('express');
const cors = require('cors');
const ntw = require('number-to-words');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/sort', (req, res) => {
    const numbersText = req.body.numbers;

    if (!numbersText.match(/^[\d,-]+$/)) {
        // return error for invalid input
        return res.status(400).json(
            'Invalid text input. Only whole numbers and commas are valid input values. Example: 1,2,3,4,5'
        );
    }

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            (text) => text.charAt(0).toUpperCase() +
                text.substring(1).toLowerCase(),
        );
    }

    const numbers = numbersText.split(',').map(Number);

    const sortedWords = numbers.map((num) => {
        const numText = ntw.toWords(num)
            // remove commas
            .replace(',', '')
            // remove hyphens
            .replace('-', ' ');
        return {
            image: Math.abs(num) > 9000,
            num,
            text: toTitleCase(numText),
        };
    }).sort((a, b) => a.text.localeCompare(b.text));

    res.json({ sortedWords });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

