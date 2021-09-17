let read = require("readline-sync");

let num1 = read.questionFloat("Saisir opérateur : ")
let operande = read.question("Saisir opérande : ")
// Tant que je n'ai pas saisie "+" , "-", "*", "/"
// Alors je redemande à l'utilisateur de saisir
while(operande !== "+" && operande !== "-" && operande !== "*" && operande !== "/") {
    console.log("Attention, l'opérande n'est pas valide !")
    operande = read.question("Saisir opérande : ")
}

let num2 = read.questionFloat("Saisir opérateur : ")

let result;

// Ternaire
result = (operande === "-") ? (num1 - num2) : (operande === "+") ? (num1 + num2) : (operande === "*") ? (num1 * num2) : (operande === "/") ? (num1 / num2) : "Calcul impossible"

console.log(result)