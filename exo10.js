let read = require("readline-sync");

let nombre = read.questionInt("Entrez un nombre : ")

for(let i = 1; i <= nombre ; i++) {
    let espaces = "";
    let etoiles = "";
    let etoiles2 = "";

    for(let j = 0; j < nombre-i ; j++) {
        espaces += " ";   
    }

    for(let k = 0; k < i; k++) {
        etoiles += "*";
        if(k !== 0) {
            etoiles2 += "*";
        }  
    }
    console.log(espaces + etoiles + etoiles2);
}