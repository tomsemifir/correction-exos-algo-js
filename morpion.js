const read = require("readline-sync")

let tab = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
]

let demanderCoordonnees = (tour) => {
    let x = 0;
    let y = 0;

    x = read.questionInt("Entrez un nombre x : ")
    y = read.questionInt("Entrez un nombre y : ")
    if (tour % 2 !== 0) {
        let isOk = false
        while (!isOk) {
            if (tab[y][x] === "-") {
                tab[y][x] = "X"
                isOk = true
            } else {
                console.log("Attention, cette place n'est pas disponible, recommencez :")
                x = read.questionInt("Entrez un nombre x : ")
                y = read.questionInt("Entrez un nombre y : ")
            }
        }
    } else {
        let isOk = false
        while (!isOk) {
            if (tab[y][x] === "-") {
                tab[y][x] = "O"
                isOk = true
            } else {
                console.log("Attention, cette place n'est pas disponible, recommencez :")
                x = read.questionInt("Entrez un nombre x : ")
                y = read.questionInt("Entrez un nombre y : ")
            }
        }
    }
}

let isVictoire = () => {
    let result = false

    // CONDITIONS DE VICTOIRE EN LIGNE
    if (tab[0][0] !== "-" && tab[0][0] === tab[0][1] && tab[0][0] === tab[0][2]) {
        result = true
    } else if (tab[1][0] !== "-" && tab[1][0] === tab[1][1] && tab[1][0] === tab[1][2]) {
        result = true
    } else if (tab[2][0] !== "-" && tab[2][0] === tab[2][1] && tab[2][0] === tab[2][2]) {
        result = true
    }

    //CONDITIONS DE VICTOIRE EN COLONNE
    if (tab[0][0] !== "-" && tab[0][0] === tab[1][0] && tab[0][0] === tab[2][0]) {
        result = true
    } else if (tab[0][1] !== "-" && tab[0][1] === tab[1][1] && tab[0][1] === tab[2][1]) {
        result = true
    } else if (tab[0][2] !== "-" && tab[0][2] === tab[1][2] && tab[0][2] === tab[2][2]) {
        result = true
    }

    // CONDITIONS EN DIAGONALES
    if (tab[0][0] !== "-" && tab[0][0] === tab[1][1] && tab[0][0] === tab[2][2]) {
        result = true
    } else if (tab[2][0] !== "-" && tab[2][0] === tab[1][1] && tab[2][0] === tab[0][2]) {
        result = true
    }

    return result
}

let affichage = () => {
    console.log("  0 1 2")
    console.log("0", tab[0][0], tab[0][1], tab[0][2])
    console.log("1", tab[1][0], tab[1][1], tab[1][2])
    console.log("2", tab[2][0], tab[2][1], tab[2][2])
}

let morpion = () => {
    let tour = 1;

    while (!isVictoire() && tour !== 10) {
        console.log(`--- TOUR ${tour} ----`)
        affichage()
        demanderCoordonnees(tour)
        tour++
    }

    affichage()
    if (!isVictoire() && tour === 10) {
        console.log("Match nul")
    } else {
        if (tour % 2 !== 0) {
            console.log("Joueur 2 a gagné")
        } else {
            console.log("Joueur 1 a gagné")
        }
    }
}

morpion()