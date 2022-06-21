"use strict";
let texte = "z";
const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const CLE = 3;
let texteTab = [];
for (let i = 0; i < texte.length; i++) {
    for (let y = 0; y < ALPHABET.length; y++) {
        if (texte[i] === ALPHABET[y]) {
            let indexVerif = y + CLE;
            if (indexVerif > ALPHABET.length) {
                indexVerif -= ALPHABET.length;
            }
            texteTab.push(ALPHABET[indexVerif]);
        }
    }
}
let texteChiffre = "";
for (let char of texteTab) {
    texteChiffre += char;
}
console.log(texteChiffre);
