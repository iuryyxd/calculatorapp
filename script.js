const allButtons = document.querySelectorAll(".btn"),
textDisplay = document.querySelector(".content span"),
clearButton = document.querySelector(".clear-button"),
calculateButton = document.querySelector(".calculate")

const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", "/", "x", "(", ")", ".", "*"]

let keyCode, value = "", calc;
var isNotaNumber = false

function getKey(e) {

    const isKeyboard = e.type === "keydown"
    keyCode = isKeyboard ? e.key : e.target.dataset.key
    
    if(keyCode == "Enter") return getResult()
    if(keyCode == "Backspace") { 
        let newValue = value.slice(0, -1)
        textDisplay.textContent = newValue
        value = newValue
    }

    if(allowedKeys.includes(keyCode)) {
        if(keyCode == "x") keyCode = "*"

        if(isNotaNumber) {
            textDisplay.textContent = ""
            isNotaNumber = false
        }

        value = textDisplay.textContent += keyCode;
        textDisplay.innerText = value
    }

    return keyCode;  
}

function getResult() {
    calc = eval(value)
    calc = calc == Infinity ? "Indefinido" : calc
    calc = isNaN(calc) ? "Indefinido" : calc
    textDisplay.innerText = calc
    if(eval(value) == Infinity || isNaN(eval(value))) isNotaNumber = true

    value = calc.toString()
}

function clearText(){
    textDisplay.innerText = ""
    value = ""

    setInterval(() => {
        document.querySelector(".clear-button").blur()
    }, 100);
}

calculateButton.addEventListener("click", getResult)
clearButton.addEventListener("click", clearText)

allButtons.forEach(button => {
    button.addEventListener("click", getKey)
})

window.addEventListener("keydown", e => getKey(e))