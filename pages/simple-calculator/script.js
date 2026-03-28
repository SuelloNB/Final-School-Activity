const display = document.getElementById('display');
const clearButton = document.getElementById('clear');

function appendValue(value) {
    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

clearButton.addEventListener('click', () => {
    display.value = "0";
});
