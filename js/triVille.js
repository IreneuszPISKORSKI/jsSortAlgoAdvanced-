let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {
    let lat2 = ville.latitude;
    let lon2 = ville.longitude;
    let lat1 = 45.188529;
    let lon1 = 5.724524;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
    // if (listVille[i].distanceFromGrenoble<listVille[j].distanceFromGrenoble){
    //     return true;
    // }else{
    //     return false;
    // }
    return listVille[i].distanceFromGrenoble<listVille[j].distanceFromGrenoble;

}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {
    temp = listVille[i];
    listVille[i] = listVille[j];
    listVille[j] = temp;
    nbPermutation++;
}

function sort(type) {
    switch (type) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'bubble2':
            bubblesort2();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'tas':
            tasSort();
            break;
    }
}

function insertsort() {
    let size = listVille.length;
    for (let i=1; i<size; i++){
        let value = listVille[i];
        let position = i;

        while(position>0 && listVille[position-1].distanceFromGrenoble>value.distanceFromGrenoble){
            listVille[position] = listVille[position-1];
            position = position-1;
        }
        listVille[position] = value;
    }
    console.log("Insertsort - ok!");
}

// function insertsort() {
//     for (let i=1; i<listVille.length; i++){
//         for (let j=i;j>=1;j--){
//             if (isLess(j,j-1)){
//                 swap(j, j-1);
//             }
//         }
//     }
//     console.log("Insertsort - ok!");
// }

function selectionsort() {
    for(i=0; i<listVille.length; i++){
        let tempIndex = i;
        for(j=i+1; j<listVille.length; j++){
            if(listVille[j].distanceFromGrenoble<listVille[tempIndex].distanceFromGrenoble){
                tempIndex=j;
            }
        }
            swap(i, tempIndex);
    }
    console.log("selectionsort - ok!");
}

function bubblesort() {
    do{
        test=0;
        for(i=0; i<listVille.length-1; i++){
            if(isLess(i+1,i)){
                swap(i, i+1);
            }else{
                test++;
            }
        }
    }while(test<listVille.length-1)
    console.log("bubblesort - ok!");
}

function bubblesort2() {
    let permut = true;
    while(permut){
        permut=false;
        for(let i=0; i<listVille.length-1; i++){
            if(listVille[i].distanceFromGrenoble>listVille[i+1].distanceFromGrenoble){
                swap(i, i+1);
                permut=true;
            }
        }
    }
    console.log("bubblesort2 - ok!");
}

function shellsort() {
    let lengthOfArray = listVille.length;
    let ecart = 0;
    while(ecart<lengthOfArray){
    ecart = 3*ecart+1;
    }

    while(ecart!=0){
        ecart= Math.floor(ecart/3);
        for(i=ecart; i<lengthOfArray; i++){
            let temp = listVille[i];
            let j=i;
            while (j>ecart-1 && listVille[j-ecart].distanceFromGrenoble>temp.distanceFromGrenoble){
                listVille[j] = listVille[j-ecart];
                j = j-ecart;
            }
            listVille[j] = temp;
        }
    }    
    console.log("shellsort - ok!");
}

function tasSort() {
    organiser();
    for(let i=listVille.length-1; i>0; i--){
        swap(0, i);
        redescendre(i, 0)
    }
    console.log("Tas - ok!");
}

function organiser(){
    for(let i=0; i<listVille.length; i++){
        remonter(i);
    }
}

function remonter(index){
    const roundIndex = Math.floor(index/2);
    if (listVille[index].distanceFromGrenoble>listVille[roundIndex].distanceFromGrenoble){
        swap(index, roundIndex);
        remonter(roundIndex);
    }
}

function redescendre(element, index){
    let form = 2*index+1;
    if (form<element){
        let max;
        if (listVille[form].distanceFromGrenoble>listVille[2*index].distanceFromGrenoble){
            max = form;
        }else{
            max = 2*index;
        }
        if (listVille[max].distanceFromGrenoble>listVille[index].distanceFromGrenoble){
            swap(max, index);
            redescendre(element, max);
        }
    }
}


function mergesort() {
    console.log("mergesort - implement me !");
}


function quicksort() {
    console.log("quicksort - implement me !");
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
