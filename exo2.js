let read = require("readline-sync");

let num1 = read.questionFloat("Saisir nombre 1 : ");
let num2 = read.questionFloat("Saisir nombre 2 : ");

let result = num1 + num2;

console.log(`${num1} + ${num2} = ${result}`)
