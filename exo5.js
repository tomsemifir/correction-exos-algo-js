let read = require("readline-sync");

let note = read.questionFloat("Saisir note : ")

if(note < 0 || note > 20) {
    console.log("Note invalide")
} else if(note >= 0 && note <= 4) {
    console.log("Catastrophique")
} else if(note <= 10) {
    console.log("Insuffisant")
} else if(note <= 14) {
    console.log("Passable")
} else if(note <= 18) {
    console.log("Bien")
} else if(note <= 20) {
    console.log("Très bien")
}