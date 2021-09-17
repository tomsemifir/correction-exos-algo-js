let read = require("readline-sync");

let nombre = read.questionFloat("Entrez un prix :");

let monnaies = [500,200,100,50,20,10,5,2,1,0.5,0.2,0.1,0.05,0.02,0.01]

for(let monnaie of monnaies) {
    let nbrMonnaie = Math.floor(nombre / monnaie)
    if(nbrMonnaie !== 0) {
        if(monnaie >= 5) {
            console.log(`Nombre de billets de ${monnaie}€ : ` + nbrMonnaie)
        } else {
            console.log(`Nombre de pièces de ${monnaie}€ : ` + nbrMonnaie)
        }
    }
    nombre -= nbrMonnaie * monnaie
}

