let tab = [12, 4, 6, 1, 8]

tab.sort((num1, num2) => num1 - num2)

console.log(tab)

// let tabLength = tab.length
// let newTab = []
// let plusPetit = 0
// let indexPlusPetit = 0

// for (let i = 0; i < tabLength; i++) {
//     for (let j = 0; j < tab.length; j++) {
//         if (tab.length !== 1) {
//             if (tab[j] > tab[j + 1]) {
//                 plusPetit = tab[j + 1]
//                 indexPlusPetit = j + 1
//             }
//         } else {
//             plusPetit = tab[j]
//         }
//     }
//     newTab.push(plusPetit)
//     tab.splice(indexPlusPetit, 1)
// }

// console.log(newTab)

//METHODE 2
// for (let num of tab) {
//     for (let index = 0; index < tab.length; index++) {
//         if (tab[index] > tab[index + 1]) {
//             let temporaire = tab[index];
//             tab.splice(index, 1, tab[index + 1])
//             tab.splice(index + 1, 1, temporaire)
//         }
//     }
// }


// console.log(tab)