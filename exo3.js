let read = require("readline-sync");

let prixFabrication = read.questionFloat("Saisir prix fabrication : ");
let prixVente = read.questionFloat("Saisir prix de vente : ");

let profit = prixVente - prixFabrication;

if(profit < 0) {
    console.log(`Perte de ${-profit}€`)
} else if(profit > 0) {
    console.log(`Profit de ${profit}€`)
} else {
    console.log("Ni profit, ni perte")
}