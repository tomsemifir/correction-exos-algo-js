const read = require("readline-sync");
const redValue = [1,3,5,7,9,12,14,16,18,21,23,25,27,28,30,32,34,36];
grid=[];
let playing = true;
const POSSIBILITY = {
    1 : {
        nom : "PLEIN",
        def : "La mise est placée sur un seul numéro. Le joueur gagne 35 fois sa mise.",
        function : () => plein(),
        multiple : 35,
    },
    2 : {
        nom : "TRANSVERSALE",
        def : "La mise est placée sur la ligne extérieure d’une rangée horizontale, soit 3 numéros. Le joueur gagne 11 fois sa mise.",
        function : () => transversale(),
        multiple : 11,
    }, 
    3 : {
        nom : "CHEVAL",
        def : "La mise est placée à cheval sur 2 numéros. Le joueur gagne 17 fois sa mise.",
        function : () => cheval(),
        multiple : 17,
    },
    4 : {
        nom : "SIXAIN",
        def : "La mise est placée sur la ligne extérieure à l’intersection de 2 rangées horizontales, soit 6 numéros. Le joueur gagne 5 fois sa mise.",
        function : () => sixain(),
        multiple : 5,
    },
    5 : {
        nom : "CARRÉ",
        def : "La mise est placée à l’intersection de 4 numéros. Le joueur gagne 8 fois sa mise.",
        function : () => carre(),
        multiple : 8,
    },
    6 : {
        nom : "DOUZAINE",
        def : "La mise est placée sur une des 3 zones suivantes : soit 12 numéros joués. 12 P (12 premiers numéros), 12 M (12 numéros du milieu), 12 D (12 derniers numéros). Le joueur gagne 2 fois sa mise. Si le 0 sort, les douzaines sont perdantes.",
        function : () => douzaine(),
        multiple : 2,
    },
    7 : {
        nom : "DOUZAINE A CHEVAL",
        def : "La mise est placée à l’intersection de 2 douzaines, soit 24 numéros joués. Le joueur gagne une demi-fois sa mise.",
        function : () => douzaineACheval(),
        multiple : 1.5,
    },
    8 : {
        nom : "COLONNE",
        def : "La mise est placée au bas d’une des 3 colonnes verticales, soit 12 numéros.Le joueur gagne 2 fois sa mise. Si le 0 sort, les colonnes sont perdantes.",
        function : () => colonne(),
        multiple : 2,
    },
    9 : {
        nom : "COLONNE A CHEVAL",
        def : "La mise est placée à l’intersection de 2 colonnes verticales, soit 24 numéros. Le joueur gagne une demi-fois la mise.",
        function: () => colonneACheval(),
        multiple : 1.5
    },
    10 : {
        nom : "ROUGE OU NOIR",
        def : "La mise est placé sur les rouges ou les noirs. Le joueur gagne 2 fois la mise",
        function : () => rougeNoir(),
        multiple : 2,
    },
    11 : {
        nom : "PAIR IMPAIR",
        def : "La mise est placé sur les nombre pairs ou impairs. Le joueur gagne 2 fois la mise",
        function : () => pairImpair(),
        multiple : 2
    },
    12 : {
        nom : "MANQUE PASSE",
        def : "La mise est placé sur les nombres superieur ou non à 18. Le joueur gagne 2 fois la mise",
        function : () => manquePasse(),
        multiple : 2
    }
}
const player = {
    cagnotte : 0,
    depos : 0,
    add : (somme) =>{
        player.depos = somme;
        player.cagnotte = somme;
    }
}

const initGrid = () => {
    for(let i = 1 ; i <= 36 ; i++){
        if(typeof(grid[(i-1)%3]) !== "object") grid[(i-1)%3]=[] ;
        grid[(i-1)%3][Math.floor((i-1)/3)]=i;
    }
}
 
const start = () =>{
    initGrid();
    printInterface("",false);
    player.add(read.questionInt("Combien voulez vous de jeton? "));
    play();
}

const play = () =>{
    while(playing){
        choix();
        read.question("\nPress Enter to continue...");
        if(player.cagnotte <1){
            printInterface();
            playing = false;
        }else{
            printInterface();
            playing = confirm("Voulez vous continuer? (o : oui / n : non) ");
        }
    }
    console.log(`Vous ressorter avec ${player.depos<=player.cagnotte?"un gain":"une perte"} de ${Math.abs(player.cagnotte-player.depos)}.`);

}

const choix = () =>{
    printInterface(afficherChoix,true);
    POSSIBILITY[readInt(1,12,"\nQuelle est votre choix: ")].function();
}

const readInt = (min,max,text) => {
    let choix;
    do{
        choix = read.questionInt(text);
    }while(choix<min || choix>max)
    return choix;
}

const confirm = (text) =>{
    let choix;
    do{
        choix = read.question(text);
    }while(!choix.match(/o|O|n|N/))
    return choix.match(/o|O/);
}

const afficherChoix = () => {
    for(const [key,value] of Object.entries(POSSIBILITY)){
        console.log(key+".",value.nom,":",value.def);
    }
}

const plein = () => {
    printInterface();
    const numero = readInt(0,36,"Choississez un numéro entre 0 et 36 : ");
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(numero === bille,mise,POSSIBILITY[1].multiple);
}

const transversale = () => {
    printInterface();
    const trioNum = selectTransversale();
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ")
    player.cagnotte-=mise;
    const bille = roule();
    verify(trioNum.includes(bille),mise,POSSIBILITY[2].multiple);
}

const selectTransversale = (text = "",auto, num) => {
    let trioNum = [];
    if(!auto)num = readInt(1,36,`Choississez un numéro entre 1 et 36 pour selectionner un ${text}trio : `);
    trioNum.push(num);
    switch(num%3){
        case 0: 
            trioNum.push(num-1,num-2)
            break;
        case 1:
            trioNum.push(num+1,num+2)
            break;
        case 2:
            trioNum.push(num-1,num+1)
            break;
    }
    trioNum.sort((a,b)=>a-b)
    if(!auto && !confirm(`Confirmez vous selectionner ce ${text} trio : ${trioNum[0]} ${trioNum[1]} ${trioNum[2]} (o : oui / n : non)\n`)) {
        trioNum = selectTransversale();
    }
    return trioNum;
}



const cheval = () => {
    printInterface();
    const num1 = readInt(0,36,"Choississez un premier numéro entre 1 et 36 : ");
    const voisins = trouverVoisins(num1).sort((a,b) => a-b);
    let num2;
    do{
        num2 = read.questionInt(`Choisissez un nombre parmi les ${voisins.length} suivants: ${voisins[0]}, ${voisins[1]}${voisins[2]?`, ${voisins[2]}`:""}${voisins[3]?`, ${voisins[3]}`:""} : `);
    }while(!voisins.includes(num2));
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ")
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille === num1 || bille === num2,mise,POSSIBILITY[3].multiple)
}

const trouverVoisinsTransversale = (num) => {
    const voisins = [];
    if(num%3 !== 1) voisins.push(num-1);
    if(num%3 !== 0) voisins.push(num+1);
    return voisins;
}

const trouverVoisinsColonne = (num) => {
    const voisins = [];
    if(num-3>=1) voisins.push(num-3);
    if(num+3<=36) voisins.push(num+3);
    return voisins;
}

const trouverVoisins = (num) => {
    const voisins = [];
    voisins.push(trouverVoisinsTransversale(num));
    voisins.push(trouverVoisinsColonne(num));
    return voisins.reduce((acc, val) => acc.concat(val), []);
}

const sixain = () => {
    printInterface();
    const premierTrio = selectTransversale("premier ");
    const voisinsPremier = trouverVoisinsColonne(premierTrio[0]); 
    const voisinsTrio = [];
    voisinsTrio.push(selectTransversale("",true,voisinsPremier[0]));
    voisinsPremier[1]?voisinsTrio.push(selectTransversale("",true,voisinsPremier[1])):"";
    const secondTrio = voisinsTrio[readInt(1,voisinsTrio.length,`\nSelectionner le deuxième trio \n1. ${voisinsTrio[0][0]+", "+voisinsTrio[0][1]+", "+voisinsTrio[0][2]}${voisinsTrio[1]?`\n2. ${voisinsTrio[1][0]+", "+voisinsTrio[1][1]+", "+voisinsTrio[1][2]}`:""}\n\nChoix :`)-1]
    const sixainDouble = [];
    sixainDouble.push(premierTrio,secondTrio)
    const sixain = sixainDouble.reduce((acc, val) => acc.concat(val), []);
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ")
    player.cagnotte-=mise;
    const bille = roule();
    verify(sixain.includes(bille),mise,POSSIBILITY[4].multiple)
}


const carre = () => {
    printInterface();
    let premierNombre;
    do{
        premierNombre = readInt(1,36,"Selectionner le plus petit des chiffres du carrés voulu : ");
        if(premierNombre%3 === 0 || premierNombre > 32) console.log("Ce nombre ne permet pas de créer un carré vu sa position");
    }while(premierNombre%3===0 || !confirm(`Confimer vous vouloir ce carré: ${premierNombre+", "+(premierNombre+1)+", "+(premierNombre+3)+", "+(premierNombre+4)} (o : oui / n : non)\n`))
    const carre = [premierNombre,premierNombre+1,premierNombre+3,premierNombre+4];
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ")
    player.cagnotte-=mise;
    const bille = roule();
    verify(carre.includes(bille),mise,POSSIBILITY[5].multiple)
}



const douzaine = () => {
    printInterface();
    const douzaine = readInt(1,3,"Choississez une douzaine:\n1. 1 à 12\n2. 13 à 24\n3. 25 à 36\n");
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && douzaine%3 === Math.floor((bille-1)/12)+1,mise,POSSIBILITY[6].multiple);
}

const douzaineACheval = () => {
    printInterface();
    const douzaine = Math.floor(readInt(1,2,"Choississez la douzaine que vous ne voulez pas:\n1. 1 à 12\n2. 25 à 36\n")*1.5);
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && douzaine%3 !== Math.floor((bille-1)/12)+1,mise,POSSIBILITY[7].multiple);

}

const colonne = () => {
    printInterface();
    const colonne = readInt(1,3,"Choissisiez la colonne que vous voulez:\n1: 1,4,7,10,13,16,19,22,25,28,31,34\n2: 2,5,8,11,14,17,20,23,26,29,32,35\n3: 3,6,9,12,15,18,21,24,27,30,33,36\n\n");
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && bille%3 === colonne%3,mise,POSSIBILITY[8].multiple);
}

const colonneACheval = () => {
    printInterface();
    const colonne = Math.floor(readInt(1,2,"Choissisiez la colonne que vous ne voulez pas:\n1: 1,4,7,10,13,16,19,22,25,28,31,34\n2: 3,6,9,12,15,18,21,24,27,30,33,36\n\n")*1.5);
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && bille%3 !== colonne%3,mise,POSSIBILITY[9].multiple);
}

const rougeNoir = () =>  {
    printInterface();
    const rougeNoir = readInt(1,2,"Choississez une couleur:\n1. Rouge\n2. Noir\n\n")===2;
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && redValue.includes(bille)^rougeNoir,mise,POSSIBILITY[10].multiple);
}

const pairImpair = () =>  {
    printInterface();
    const pairImpair = readInt(1,2,"Choississez un des deux:\n1. Pair\n2. Impair\n\n")===2;
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && bille%2===0^pairImpair,mise,POSSIBILITY[11].multiple);
}

const manquePasse = () =>  {
    printInterface();
    const manquePasse = readInt(1,2,"Choississez un des 2:\n1. Manque\n2. Passe\n\n")===2;
    const mise = readInt(1,player.cagnotte,"Combien voulez vous misez : ");
    player.cagnotte-=mise;
    const bille = roule();
    verify(bille!=0 && bille<=18^manquePasse,mise,POSSIBILITY[12].multiple);
}

const roule = () => {
    let bille = 0;
    for(let i = 0 ; i < Math.random()*50; i++){
        printInterface("")
        bille = Math.floor(Math.random()*37);
        console.log(bille)
        syncDelay(100)
    }
    return bille;
    
}
function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
   }

const printInterface = (functionPrint, plateau=true) => {
    console.clear()
    console.log(`Cagnotte = ${player.cagnotte}\n\n`)
    if(plateau){
        printGrid();
        console.log("\n");
    } 
    if(functionPrint) functionPrint();
}

const verify = (condition,mise,multiple) => {
    if(condition){
        player.cagnotte+=mise*multiple;
        console.log(`\nVous récupérer vos ${mise} jetons et remporter ${mise*multiple-mise} jetons, Cagnote = ${player.cagnotte}`);
    }else{
        console.log(`\nVous perdez ${mise} jeton, Cagnote = ${player.cagnotte}`);
    }
}

const printGrid = () =>{
    let color = 0;
    for(let i = 0; i < grid.length ; i++){
        process.stdout.write("\t");
        process.stdout.write(`\x1b[42m ${i===1?"0":" "} \x1b[49m`);
        for( let j = 0 ; j <grid[0].length ; j++){
            if(redValue.includes(grid[i][j])) color = 41;
            else color = 40;
            process.stdout.write(`\x1b[${color}m  ${grid[i][j]}  \x1b[49m`);
        }
        process.stdout.write("\n");
    }
}

start();