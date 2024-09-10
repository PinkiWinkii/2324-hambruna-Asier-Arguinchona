import { donutData } from "./donuts.js";


const donutArray = donutData.items.item;

//console.log(donutArray.length);
// 1.- Nuestro grupo se encuentra totalmente debilitado. 
// Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:

// 1.1.- Donut con más Azúcar:

let donutsWithMostSugar = findDonutWithMostSugar(donutArray);

let allDonutsWithMostSugarString = retrieveAllDonutNames(donutsWithMostSugar, "azúcar", true);

console.log(allDonutsWithMostSugarString);

// 1.2- Donut con más Hierro

let donutWithMostIron = findDonutWithMostIron(donutArray);

let allDonutsWithMostIronString = retrieveAllDonutNames(donutWithMostIron, "hierro", true);

console.log(allDonutsWithMostIronString);

// 1.3- Donut con más Proteína

let donutWithMostProtein = findDonutWithMostProtein(donutArray);

let allDonutsWithMostProteinString = retrieveAllDonutNames(donutWithMostProtein, "proteína", true);

console.log(allDonutsWithMostProteinString);








function findDonutWithMostSugar(donutsArray)
{
    let maxSugar = 0;
    let maxSugarDonutID = 0;
    let donutNameArray = [];

    for(let i = 0; i < donutsArray.length; i++)
    {
        const currentDonutSugar = parseInt(donutsArray[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);

        if(currentDonutSugar > maxSugar)
        {
            maxSugar = currentDonutSugar;
            maxSugarDonutID = donutsArray[i].id;
            donutNameArray = [];
            let donutNameWithMostSugar = findDonutNameByID(donutsArray, maxSugarDonutID);
            donutNameArray.push(donutNameWithMostSugar);
        }
        else if(currentDonutSugar === maxSugar)
        {
            maxSugar = currentDonutSugar;
            maxSugarDonutID = donutsArray[i].id;
            let donutNameWithMostSugar = findDonutNameByID(donutsArray, maxSugarDonutID);
            donutNameArray.push(donutNameWithMostSugar);
        }

    }

    return donutNameArray;
}

function findDonutWithMostIron(donutsArray)
{
    let maxIron = 0;
    let maxIronDonutID = 0;
    let donutNameArray = [];

    for(let i = 0; i < donutsArray.length; i++)
    {
        const donutVitamines = donutsArray[i].nutrition_facts.nutrition.vitamines;

        for(let j = 0; j < donutVitamines.length; j++)
        {
            if(donutVitamines[j].type === "Iron")
            {
                const currentDonutIron = parseInt(donutVitamines[j].percent);

                if(currentDonutIron > maxIron)
                {
                    maxIron = currentDonutIron;
                    maxIronDonutID = donutsArray[i].id;
                    donutNameArray = [];
                    let donutNameWithMostIron = findDonutNameByID(donutsArray, maxIronDonutID);
                    donutNameArray.push(donutNameWithMostIron);
                }
                else if(currentDonutIron === maxIron)
                {
                    maxIron = currentDonutIron;
                    maxIronDonutID = donutsArray[i].id;
                    let donutNameWithMostIron = findDonutNameByID(donutsArray, maxIronDonutID);
                    donutNameArray.push(donutNameWithMostIron);
                }
                
            }
        }
    }

    return donutNameArray;
}

function findDonutWithMostProtein(donutsArray)
{
    let maxProtein = 0;
    let maxProteinDonutID = 0;
    let maxProteinDonutNameArray = [];

    for(let i = 0; i < donutsArray.length; i++)
    {
        const currentDonutProtein = parseInt(donutsArray[i].nutrition_facts.nutrition.proteine);

        //console.log(currentDonutProtein);
        
        if(currentDonutProtein > maxProtein)
        {
            maxProtein = currentDonutProtein;
            maxProteinDonutID = donutsArray[i].id;
            maxProteinDonutNameArray = [];
            let donutNameWithMostProteine = findDonutNameByID(donutsArray, maxProteinDonutID);
            maxProteinDonutNameArray.push(donutNameWithMostProteine);
        }
        else if(currentDonutProtein === maxProtein)
        {
            maxProtein = currentDonutProtein;
            maxProteinDonutID = donutsArray[i].id;
            let donutNameWithMostProteine = findDonutNameByID(donutsArray, maxProteinDonutID);
            maxProteinDonutNameArray.push(donutNameWithMostProteine);
        }

    }

    return maxProteinDonutNameArray;
}
function receiveAllDonutWithAFixedIronQuantity(donutsArray, ironQty)
{
    for(let i = 0; i < donutsArray.length; i++)
    {
        const donutIron = donutsArray[i].nutrition_facts.nutrition.vitamines;

        for(let j = 0; j < donutVitamines.length; j++)
        {
            if(donutVitamines[j].type === "Iron")
            {
                const currentDonutIron = parseInt(donutVitamines[j].percent);

                if(currentDonutIron > maxIron)
                {
                    maxIron = currentDonutIron;
                    maxIronDonutID = donutsArray[i].id;
                }
            }
        }
    }
}

function retrieveAllDonutNames(donutNames, atributeName, isMore)
{
    let allNamesString = "";

    if(donutNames.length > 1)
    {
        allNamesString += "Los donut con más " + atributeName + " son el "
    }
    else
    {
        allNamesString += "El donut con más " + atributeName + " es el " + donutNames[0];
        return allNamesString;
    }

    for(let i = 0; i < donutNames.length; i++)
    {
        if(i > 0 && i < donutNames.length - 1)
        {
            allNamesString += ", el ";
        }
        else if (i === donutNames.length - 1)
        {
            allNamesString += " o el ";
        }
        allNamesString += donutNames[i];
    }

    return allNamesString;
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