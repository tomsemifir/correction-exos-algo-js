const read = require("readline-sync")

/**
 * Fonction qui demande à l'utilisateur un nombre de balle compris entre 1 et 8
 * @returns 
 */
let demanderNbBalle = () => {
    let nbBalle = 0
    do {
        nbBalle = read.questionInt("Combien de balle voulez-vous mettre dans le revolver ?")
    } while (nbBalle > 8 || nbBalle <= 0)
    return nbBalle
}

/**
 * Fonction qui affiche le joueur gagnant
 * @param {number} numJoueur 
 */
let quiGagne = (numJoueur) => {
    console.log(`Joueur ${numJoueur} est mort...`)
}

/**
 * Jeu de la roulette russe
 */
let roulette = () => {
    //Nombre de balles
    let nbBalle = demanderNbBalle();
    //Est-ce qu'un joueur est mort ? non -> false
    let isUnMort = false;
    //Numéro de joueur (1 ou 2)
    let numJoueur = 1;
    //Nombre évolutif du nombre de tours
    let nbTour = 1;

    //Tant qu'aucun joueur est mort
    while (!isUnMort) {
        //Numéro de joueur, par exemple : (2)%2 = 0 ---> + 1 donc joueur 1
        numJoueur = (nbTour-1) % 2 + 1
        console.log(`---- TOUR ${nbTour} ----`)
        console.log(`Joueur ${numJoueur} tir un coup....`)
        //Utilisé dans le vide pour faire une pause, appuyer sur entrer pour continuer
        read.question("")
        //Si le nombre aléatoire (entre 0 et 8) est inférieur au nombre de balles dans le revolver alors le joueur est mort
        if ((Math.random() * 8) <= nbBalle) {
            console.log("PAAAAAAAAAAN !")
            quiGagne(numJoueur)
            isUnMort = true
        } else {
            console.log("*Clic, clic*... Rien ne se passe...")
            console.log(`Joueur ${numJoueur} a survécu !`)
        }
        read.question("")
        //Augmenter le nombre de tour
        nbTour++
    }
    
}

roulette()


