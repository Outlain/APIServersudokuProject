const PORT = process.env.PORT;
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/solve', (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
        },
        data: `{"puzzle": "${req.body.numbers}"}`
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.json(response.data)
        populateValues(response.data.solvable, response.data.solution)
    }).catch(function (error) {
        console.error(error);
    });
})


app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))