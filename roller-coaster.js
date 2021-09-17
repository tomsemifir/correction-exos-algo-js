const read = require("readline-sync")

let nbPlaces = 5
let tours = 3
let file = [1,1,1,1]
let profit = 0

let roller = () => {
    // Boucle sur le nombre de tours
    for(let index = 1; index <= tours; index++) {
        // Set places restantes au nombre de places
        let nbPlacesRestantes = nbPlaces
        // Set un tableau vide qui contient les groupes montés dans le manège
        let groupesInRoller = []
        // Boucle sur la file
        while(nbPlacesRestantes) {
            // Set la taille du groupe
            let groupe = file[0]
            // Si groupe inférieur ou égal au nombre de places restantes
            if(groupe <= nbPlacesRestantes) {
                // Ajouter au profit la taille du groupe (1€ par personne)
                profit += groupe
                // Enlever aux places restantes la taille du groupe
                nbPlacesRestantes -= groupe
                // Supprimer le groupe de la file d'attente
                file.splice(0,1)
                // Ajouter aux groupes dans le manège le groupe rentré
                groupesInRoller.push(groupe)
            } else break //Break si le groupe ne peut pas rentrer
        }
        // Fin du tour
        // Ré-ajouter à la file les groupes rentrés dans le manège
        file.push(...groupesInRoller)
    }
    // Afficher les profits
    console.log(profit)
}

roller()