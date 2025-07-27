function calculer() {
    const input1 = document.getElementById("firstNumber");
    const input2 = document.getElementById("secondNumber");
    const operation = document.getElementById("operation");
    const res = document.getElementById("result");

    let firstNumber = input1.value;
    let secondNumber = input2.value;
    let op = operation.value;
    let result = 0;

    if (op == "addition") {
        result = 1 * firstNumber + 1 * secondNumber;
    } else if (op == "substraction") {
        result = 1 * firstNumber - 1 * secondNumber;
    } else if (op == "multiplication") {
        result = 1 * firstNumber * 1 * secondNumber;
    } else if (op == "division") {
        result = (1 * firstNumber) / (1 * secondNumber);
    } else {
        result = (1 * firstNumber) % (1 * secondNumber);
    }

    console.log("Resultat: ", result);

    res.innerText = result;
}
