const read = require("readline-sync")

/**
 * Fonction qui transforme un tableau de charactère en un tableau de la même taille contenant des "-"
 * @param {string[]} tab tableau à transformer
 * @returns 
 */
let cacherMot = (tab) => {
    let result = []
    for(let char of tab) {
        result.push("-")
    }
    return result
}

/**
 * Fonction qui transforme un tableau en chaîne de charactère et l'affiche
 * @param {string[]} tab tableau à transformer
 */
let afficherMot = (tab) => {
    let result = ""
    for(let char of tab) {
        result += char
    }
    console.log(`Etat actuel du mot : ${result}`)
}

/**
 * Fonction qui compare motSecret et motCache.
 * 
 * Renvoie "true" si les deux tableaux sont identiques.
 * 
 * Renvoie "false" si au moins une lettre est différente.
 * @param {string[]} motSecret tableau de charactère contenant le mot secret
 * @param {string[]} motCache tableau de charachtère contenant le mot caché
 * @returns 
 */
let isMotTrouve = (motSecret, motCache) => {
    let result = true;
    for(let index = 0; index < motSecret.length; index++) {
        if(motSecret[index] !== motCache[index]) {
            result = false
            break
        }
    }
    return result
}

/**
 * Fonction qui regarde si la lettre est présente dans le motSecret.
 * 
 * Si la lettre est présente, remplace les "-" correspondants dans motCaché.
 * 
 * Renvoie "true" si la lettre est présente au moins une fois.
 * 
 * Renvoie "false" si la lettre n'est pas présente dans le mot.
 * @param {string[]} motSecret tableau de charactère contenant le mot secret
 * @param {string[]} motCache tableau de charachtère contenant le mot caché
 * @param {string} lettre lettre à vérifier
 * @returns 
 */
let isLettreInMot = (motSecret, motCache, lettre) => {
    let result = false
    for(let index = 0; index < motSecret.length; index++) {
        if(motSecret[index] === lettre) {
            motCache[index] = lettre
            result = true
        }
    }
    return result
}

/**
 * Fonction qui transforme une chaine de charactère en tableau de charactère
 * @param {string} str chaine de charactère à transformer en tableau
 * @returns 
 */
let transformStringToList = (str) => {
    let result = []
    for(let char of str) {
        result.push(char)
    }
    return result
}

let pendu = () => {
    let nbVie = read.questionInt("Entrez un nombre de vie : ")
    let motSecret = transformStringToList("coucou")
    let motCache = cacherMot(motSecret)
    afficherMot(motCache)

    while(!isMotTrouve(motSecret, motCache) && nbVie) {
        let lettre = read.question("Entrez une lettre : ")
        if(!isLettreInMot(motSecret, motCache, lettre)) {
            nbVie--
        }
        afficherMot(motCache)
        
        console.log(`Il vous reste ${nbVie} vies`)
    }

    if(nbVie) {
        console.log("Bravo !")
    } else {
        console.log("Paix à ton âme, tu es pendu....")
    }
}

pendu()
