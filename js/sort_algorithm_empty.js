
function swap(array, i, j) {
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}

function insertionSort(inputArr) {
    for (i=1; i<inputArr.length; i++){
        for (j=i;j>=1;j--){
            if (inputArr[j] < inputArr[j-1]){
                swap(inputArr, j, j-1);
            }
        }
    }
    console.log("Insertion - ok!");
    return inputArr;
}

function selectionSort(inputArr) {
    for(i=0; i<inputArr.length-1; i++){
        let temp = inputArr[i];
        let tempIndex = i;
        for(j=i+1; j<inputArr.length; j++){
            if(inputArr[j]<temp){
                temp=inputArr[j];
                tempIndex=j;
            }
        }
        if (temp<inputArr[i]){
            swap(inputArr, i, tempIndex);
        }
    }
    console.log("Selection - ok!");
    return inputArr;
}

function bubbleSort(inputArr) {
    do{
        test=0;
        for(i=0; i<inputArr.length-1; i++){
            if(inputArr[i]>inputArr[i+1]){
                swap(inputArr, i, i+1);
            }else{
                test++;
            }
        }
    }while(test<inputArr.length-1);
    console.log("Bubble - ok!");
    return inputArr;
}

function bubbleSort2(inputArr){
    let permut = true;
    while(permut){
        permut=false;
        for(let i=0; i<inputArr.length-1; i++){
            if(inputArr[i]>inputArr[i+1]){
                swap(inputArr, i, i+1);
                permut=true;
            }
        }
    }
    console.log("Bubble2 - ok!");
}

function shellSort(inputArr) {
    let lengthOfArray = inputArr.length;
    let ecart = 0;
    do{
    ecart = 3*ecart+1;
    }while(ecart<lengthOfArray)

    while(ecart!=0){
        ecart= Math.floor(ecart/3);
        for(i=ecart; i<lengthOfArray; i++){
            let temp = inputArr[i];
            let j=i;
            while (j>ecart-1 && inputArr[j-ecart]>temp){
                inputArr[j] = inputArr[j-ecart];
                j = j-ecart;
            }
            inputArr[j] = temp;
        }
    }    

    console.log("Shell - ok!");
    return inputArr;
}

function tasSort(inputArr) {
    organiser(inputArr);
    for(let i=inputArr.length-1; i>0; i--){
        swap(inputArr, 0, i);
        redescendre(inputArr, i, 0)
    }
    console.log("Tas - ok!");
    return inputArr;
}

function organiser(array){
    for(let i=0; i<array.length; i++){
        remonter(array, i);
    }
}

function remonter(array, index){
    const roundIndex = Math.floor(index/2);
    if (array[index]>array[roundIndex]){
        swap(array, index, roundIndex);
        remonter(array, roundIndex);
    }
}

function redescendre(array, element, index){
    let form = 2*index+1;
    if (form<element){
        let max;
        if (array[form]>array[2*index]){
            max = form;
        }else{
            max = 2*index;
        }
        if (array[max]>array[index]){
            swap(array, max, index);
            redescendre(array, element, max);
        }
    }
}

function irekTest(array){
    for(i=0; i<array.length-1; i++){
        for(j=array.length-1; j>i; j--){
            if (array[i]>array[j]){
                swap(array, i , j);
            }
        }
    }
    console.log("Irek - ok!");
    return array;
}

//////////////////////////////////////////////////////////
//                          START                       //
//////////////////////////////////////////////////////////

// Création de list

var list = [];
let size = 20000;
for (let i = 0; i < size; i++) {
    list.push(Math.floor(Math.random() * size * 2));
}


// Calculs, performances
console.time("insertion");
var insertionList = insertionSort([...list]);
console.timeEnd("insertion");

console.time("selection");
var selectionList = selectionSort([...list]);
console.timeEnd("selection");

console.time("bubble");
var bubbleList = bubbleSort([...list]);
console.timeEnd("bubble");

console.time("bubble2");
var bubbleList2 = bubbleSort2([...list]);
console.timeEnd("bubble2");

console.time("shell");
var shellList = shellSort([...list]);
console.timeEnd("shell");

console.time("tas");
var tasList = tasSort([...list], 0, list.length);
console.timeEnd("tas");

console.time("Irek");
var irekList = irekTest([...list]);
console.timeEnd("Irek");

// Affichage des résultats

console.log(" ");
console.log("Insertion");
console.log(list);
console.log(insertionList);
console.log(" ");
console.log("Selection");
console.log(list);
console.log(selectionList);
console.log(" ");
console.log("Bubble");
console.log(list);
console.log(bubbleList);
console.log(" ");
console.log("Bubble2");
console.log(list);
console.log(bubbleList2);
console.log(" ");
console.log("Shell");
console.log(list);
console.log(shellList);
console.log(" ");
console.log("Tas");
console.log(list);
console.log(tasList);
console.log(" ");
console.log("Irek");
console.log(list);
console.log(irekList);