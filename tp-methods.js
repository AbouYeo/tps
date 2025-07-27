function calculer() {
    const inputName = document.getElementById("name");
    const inputFirstNumber = document.getElementById("firstNumber");
    const inputSecondNumber = document.getElementById("secondNumber");
    const operation = document.getElementById("operation");
    const icon = document.getElementById("icon");
    const res = document.getElementById("resultText");

    let name = inputName.value.trim().split(" ");
    let firstNumber = inputFirstNumber.value;
    let secondNumber = inputSecondNumber.value;
    let op = operation.value;
    let result = 0;
    let initiales = "";
    let signeOperation = "";

    if (op == "addition") {
        result = Number(firstNumber) + Number(secondNumber);
        signeOperation = "+";
    } else if (op == "substraction") {
        result = Number(firstNumber) - Number(secondNumber);
        signeOperation = "-";
    } else if (op == "multiplication") {
        result = Number(firstNumber) * Number(secondNumber);
        signeOperation = "*";
    } else if (op == "division") {
        result = Number(firstNumber) / Number(secondNumber);
        signeOperation = "/";
    } else if (op == "modulo") {
        result = Number(firstNumber) % Number(secondNumber);
        signeOperation = "%";
    } else {
        res.innerText = "Veuillez choisir une opération sil vous plait!";
    }

    console.log("Resultat: ", result);
    console.log(name);
    name = name.forEach((element) => {
        element.trim();
    });
    console.log(name);

    icon.innerText = initiales;

    res.innerText = `${name} ${firstNumber} ${signeOperation} ${secondNumber} =  ${result}`;
}
