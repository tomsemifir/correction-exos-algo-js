let temperatures = [12, 25, -5, 7, 6, 5]

let tempZero = temperatures[0]

//Parcourir le tableau
for(let temperature of temperatures) {
    if(Math.abs(tempZero) > Math.abs(temperature)) {
        tempZero = temperature
    } else if(Math.abs(tempZero) === Math.abs(temperature) && temperature < 0) {
        // if(tempZero > temperature) {
        //     tempZero = temperature
        // }
        tempZero = temperature
    }
}
//Si la temperature que je parcours actuellement est plus proche de 
// zero que tempZero actuel ALORS tempZero devient la temperature parcourue

console.log(`La température la plus proche de zéro est ${tempZero}`)