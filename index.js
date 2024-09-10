import { donutData } from "./donuts.js";


const donutArray = donutData.items.item;

//console.log(donutArray.length);
// 1.- Nuestro grupo se encuentra totalmente debilitado. 
// Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:

// 1.1.- Donut con más azucar:

let maxSugar = 0;
let maxSugarDonutID = 0;

let donutWithMostSugar = findDonutWithMostSugar(donutArray);

console.log("El donut con más azucar es " + donutWithMostSugar);

function findDonutWithMostSugar(donutsArray)
{
    for(let i = 0; i < donutsArray.length; i++)
    {
        const currentDonutSugar = parseInt(donutsArray[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);

        if(currentDonutSugar > maxSugar)
        {
            maxSugar = currentDonutSugar;
            maxSugarDonutID = donutsArray[i].id;
        }
    }

    let donutNameWithMostSugar = findDonutNameByID(donutsArray, maxSugarDonutID);
    return donutNameWithMostSugar;
}

function findDonutNameByID(donutsArray, donutID)
{
    for(let i = 0; i < donutsArray.length; i++)
    {
        if(donutsArray[i].id === donutID)
        {
            return donutsArray[i].name;
        }
    }
}