import { donutData } from "./donuts.js";

fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    .then((response) => response.json())
    .then((data) => execute(data.items.item));

    function execute(data)
    {
        const donutArray = data;

        //console.log(donutArray.length);
        // 1.- Nuestro grupo se encuentra totalmente debilitado. 
        // Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:
    
        // 1.1.- Donut con más Azúcar:
    
        console.log("EJERCICIO 1: ");    

        let donutsWithMostSugar = findDonutWithMostSugar(donutArray);
    
        let allDonutsWithMostSugarString = retrieveAllDonutNames(donutsWithMostSugar, "azúcar", true);
    
        console.log(allDonutsWithMostSugarString);
    
        // 1.2.- Donut con más Hierro
    
        let donutWithMostIron = findDonutWithMostIron(donutArray);
    
        let allDonutsWithMostIronString = retrieveAllDonutNames(donutWithMostIron, "hierro", true);
    
        console.log(allDonutsWithMostIronString);
    
        // 1.3.- Donut con más Proteína
    
        let donutWithMostProtein = findDonutWithMostProtein(donutArray);
    
        let allDonutsWithMostProteinString = retrieveAllDonutNames(donutWithMostProtein, "proteína", true);
    
        console.log(allDonutsWithMostProteinString);
    
        // 1.4.- Donut con menos Fibra
    
        let donutWithLessFiber = findDonutWithLeastFiber(donutArray);
        
        let allDonutsWithLeastFiberString = retrieveAllDonutNames(donutWithLessFiber, "fibra", false);

        console.log(allDonutsWithLeastFiberString);

        console.log("");    

        // 2.1 Listar los donuts y sus calorias

        console.log("EJERCICIO 2: ");    
        console.log("Mostramos los donuts y sus calorias correspondientes: ");       

        getAllDonutsData(donutArray, "calories");
        
        // 2.2 Listar los donuts y sus calorias
        
        console.log("");
        console.log("Mostramos los donuts y sus datos de carbohidratos correspondientes: ");     

        getAllDonutsData(donutArray, "carbs");

        // 2.3 La media de calorias de todos los donuts

        console.log("");

        getAllDonutsData(donutArray, "caloriesAverage");

        // 2.4 Suma de todas las grasas saturadas

        console.log("");
        getAllDonutsData(donutArray, "grasasSaturadasTotal");

        // 2.5 El porcentaje medio de cada vitamina

        console.log("");
        getAllDonutsData(donutArray, "vitamineAverage");


        ////////////////////////////////////////////////////////////////////////////////////

        // EJERCICIO 2 FUNCTIONS

        function getAllDonutsData(donutsArray, dataToRetrieve)
        {

            let totalCalories = 0;
            let totalGrasasSaturadas = 0;

            let totalVitamineA = 0;
            let totalVitamineC = 0;
            let totalCalcium = 0;
            let totalIron = 0;

            for(let i = 0; i < donutsArray.length; i++)
            {
                const currentDonutName = donutsArray[i].name;
                const currentDonutCalories = donutsArray[i].nutrition_facts.nutrition.calories;
                const currentDonutCarbohydrates = donutsArray[i].nutrition_facts.nutrition.carbohydrate;   
                const currentGrasasSaturadas = donutsArray[i].nutrition_facts.nutrition.fat.fat_type.saturated;

                totalCalories += parseInt(currentDonutCalories);
                totalGrasasSaturadas += parseInt(currentGrasasSaturadas);

                const currentTotalVitamineA = donutsArray[i].nutrition_facts.nutrition.vitamines[0].percent;
                const currentTotalVitamineC = donutsArray[i].nutrition_facts.nutrition.vitamines[1].percent;
                const currenTotalCalcium = donutsArray[i].nutrition_facts.nutrition.vitamines[2].percent;
                const currenTotalIron = donutsArray[i].nutrition_facts.nutrition.vitamines[3].percent;
                
                totalVitamineA += parseInt(currentTotalVitamineA);
                totalVitamineC += parseInt(currentTotalVitamineC);
                totalCalcium += parseInt(currenTotalCalcium);
                totalIron += parseInt(currenTotalIron);

                switch(dataToRetrieve)
                {
                    case "calories":
                        console.log("El dónut " + currentDonutName + " tiene " + currentDonutCalories + " calorías");
                        break;
                    
                    case "carbs":
                        console.log("El dónut " + currentDonutName + " tiene " + currentDonutCarbohydrates.carbs_detail.amount + 
                        " de carbohidratos, de los cuales " + currentDonutCarbohydrates.carbs_detail.type.fibre + " son fibra y " +
                        currentDonutCarbohydrates.carbs_detail.type.sugars + " son azćares, conteniendo este dónut un valor de ingesta " + 
                        "diaría recomendada de estos carbohidratos de un " + currentDonutCarbohydrates.daily_value);
                        break;

                    case "caloriesAverage":
                        if(i === donutsArray.length - 1)
                        {
                            console.log("La media de calorías de todos los donuts es de " + totalCalories/donutsArray.length + "g.");
                        }
                        break;

                    case "grasasSaturadasTotal":
                        if(i === donutsArray.length - 1)
                        {
                            console.log("El total de las grasas saturadas de todos los donuts es de " + totalGrasasSaturadas + "g.");
                        }
                        break;

                    case "vitamineAverage":
                        {
                            if(i === donutsArray.length - 1)
                            {
                                console.log("La media de la vitamina A es de " + (totalVitamineA/donutsArray.length).toFixed(2) + "%.");
                                console.log("La media de la vitamina C es de " + (totalVitamineC/donutsArray.length).toFixed(2) + "%.");
                                console.log("La media del Calcio es de " + (totalCalcium/donutsArray.length).toFixed(2) + "%.");
                                console.log("La media del Hierro es de " + (totalIron/donutsArray.length).toFixed(2) + "%.");
                            }
                        }
                        break;
                }
               

            }
    
        }

        ////////////////////////////////////////////////////////////////////////////////////

        // EJERCICIO 1 FUNCTIONS

        function findDonutWithLeastFiber(donutsArray)
        {
            let maxFiber = parseInt(donutsArray[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre);
            let maxFiberDonutID = 0;
            let donutNameArray = [];
    
            for(let i = 0; i < donutsArray.length; i++)
            {
                const currentDonutFiber = parseInt(donutsArray[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre);

                if(currentDonutFiber < maxFiber)
                {
                    maxFiber = currentDonutSugar;
                    maxFiberDonutID = donutsArray[i].id;
                    donutNameArray = [];
                    let donutWithLeastFiber = findDonutNameByID(donutsArray, maxFiberDonutID);
                    donutNameArray.push(donutWithLeastFiber);
                }
                else if(currentDonutFiber === maxFiber)
                {
                    maxFiber = currentDonutFiber;
                    maxFiberDonutID = donutsArray[i].id;
                    let donutWithLeastFiber = findDonutNameByID(donutsArray, maxFiberDonutID);
                    donutNameArray.push(donutWithLeastFiber);
                }
    
            }
    
            return donutNameArray;
        }

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
            let masOMenos = isMore ? "más" : "menos";
    
            if(donutNames.length > 1)
            {
                allNamesString += "Los dónuts con " + masOMenos + " " + atributeName + " son el "
            }
            else
            {
                allNamesString += "El dónut con " + masOMenos + " " + atributeName + " es el " + donutNames[0];
                return allNamesString + ".";
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
    
            return allNamesString + ".";
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
    }
