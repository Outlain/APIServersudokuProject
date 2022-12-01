// const { response } = require("express")
const sudokuMap = document.querySelector('#map')
const solveBtn = document.querySelector('#solve-btn')
const solutionDspl = document.querySelector('#responce')
const squares = 81
let submit = []

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    sudokuMap.appendChild(inputElement)
}

function joinValues() {
    const input = document.querySelectorAll('input')
    input.forEach(element => {
        element.value ? submit.push(element.value) : submit.push('.')
    });
    console.log(submit)
}

function populateValues(solvable, solution) {
    const inputs = document.querySelectorAll('input')
    if (solvable && solution) {
        inputs.forEach((input, index) => {
            input.value = solution[index]
        })
        solutionDspl.innerHTML = "Solution is Displayed"
    } else {
        solutionDspl.innerHTML = 'This is not solvable with these parameters'
    }
}
function solve() {
    joinValues();
    const data = {numbers : submit.join('')}
    console.log('The data' + data)

    fetch('http://localhost:8005/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            populateValues(data.solvable, data.solution)
            submit = [];
        })
        .catch((error) => {
            console.error('Error', error)
        })
}

solveBtn.addEventListener('click', solve)