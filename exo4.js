let read = require("readline-sync");

let num1 = read.questionFloat("Saisir premier nombre : ")
let num2 = read.questionFloat("Saisir second nombre : ")
let num3 = read.questionFloat("Saisir troisième nombre : ")

if(num1 > num2 && num1 > num3) {
    console.log(`Le plus grand nombre est : ${num1}`)
} else if(num2 > num1 && num2 > num3) {
    console.log(`Le plus grand nombre est : ${num2}`)
} else {
    console.log(`Le plus grand nombre est : ${num3}`)
}