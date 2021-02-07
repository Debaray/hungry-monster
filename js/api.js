const filterMealName = () => {
    const searchBox = document.getElementById('search-box').value;
    const urlMealName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox}`;//search by meal name
    const urlMealFirst = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBox}`;//search by meal first letter
    const urlMainIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBox}`;//search by meal main ingredient
    const urlMealByCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchBox}`;//search by meal category
    const urlMealByArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchBox}`;//search by meal area

    const mealDiv = document.getElementById('display-meals');
    mealDiv.innerHTML = "";
    checkResultData = 0;
    fetchData(urlMealName);
    fetchData(urlMealFirst);
    fetchData(urlMainIngredient);
    fetchData(urlMealByCategory);
    fetchData(urlMealByArea);
}
var checkResultData = 0;
const fetchData = url => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals === null) {
                isDisplayMealEmpty();
                return;
            }
            else {
                displayMeals(data.meals);
                isDisplayMealEmpty();
            }
        })
        .catch(err => {isDisplayMealEmpty()});
}
const isDisplayMealEmpty = () =>{
    const noDataDiv = document.getElementById('no-data-found');
    const ingredientDiv = document.getElementById('display-ingredients');
    const mealDiv = document.getElementById('display-meals');
    if(checkResultData > 0)
    {
        noDataDiv.style.display = "none";
        ingredientDiv.style.display = "none";
        mealDiv.style.display = "grid";
    }
    else
    {
        noDataDiv.style.display = "block";
        ingredientDiv.style.display = "none";
        mealDiv.style.display = "none";
        const createNoDataDiv = document.createElement('div');
        createNoDataDiv.className = 'no-data';
        noDataDiv.innerHTML ="";
        const noDataInfo = `
        <div >
        <img src="images/noDataFound.webp">
        <h3 class="roboto-font">No Meal Found</h3>
        </div>
       `;
       createNoDataDiv.innerHTML = noDataInfo;
        noDataDiv.appendChild(createNoDataDiv);
    }
}
// const filterMealFirstLetter = () => {
//     const searchBox = document.getElementById('search-box').value;
//     const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBox}`;//search by meal first letter
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             if(data.meals === null)
//             {
//                 console.log("filterMealByMainIngredient");
//                 filterMealByMainIngredient();
//             }
//             else{
//                 console.log("2");
//                 displayMeals(data.meals);
//             }
//            })
//         .catch(err => console.log(err));
// }

// const filterMealByMainIngredient = () => {
//     const searchBox = document.getElementById('search-box').value;
//     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBox}`;//search by meal main ingredient
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             if(data.meals === null)
//             {
//                 console.log("filterMealByCategory");
//                 filterMealByCategory();
//             }
//             else{
//                 console.log("3");
//                 displayMeals(data.meals);
//             }
//            })
//         .catch(err => console.log(err));
// }

// const filterMealByCategory = () => {
//     const searchBox = document.getElementById('search-box').value;
//     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchBox}`;//search by meal category
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             if(data.meals === null)
//             {
//                 console.log("filterMealByArea");
//                 filterMealByArea();
//             }
//             else{
//                 console.log("4");
//                 displayMeals(data.meals);
//             }
//            })
//         .catch(err => console.log(err));
// }

// const filterMealByArea = () => {
//     const searchBox = document.getElementById('search-box').value;
//     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchBox}`;//search by meal area
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             if(data.meals === null)
//             {
//                 console.log("Ar nai");
//                 //filterMealByArea();
//             }
//             else{
//                 console.log("5");
//                 displayMeals(data.meals);
//             }
//            })
//         .catch(err => console.log(err));
// }

const displayMeals = meals => {
    if (meals === null) return;
    const mealDiv = document.getElementById('display-meals');
    meals.forEach(meal => {
        const createMealDiv = document.createElement('div');
        createMealDiv.className = 'single-meal';
        const mealInfo = `
        <div onclick="mealDetail(${meal.idMeal})">
        <img src="${meal.strMealThumb}">
        <h3 class="roboto-font">${meal.strMeal}</h3>
        </div>
       `;
        createMealDiv.innerHTML = mealInfo;
        mealDiv.appendChild(createMealDiv);
        checkResultData++;
        console.log(checkResultData);
    });
}

const mealDetail = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayIngredients(data.meals[0]))
        .catch(err => console.log(err));
}

const displayIngredients = mealIngredientDetails => {
    const ingredientDiv = document.getElementById('display-ingredients');
    ingredientDiv.style.display = "block";
    const mealDiv = document.getElementById('display-meals');
    mealDiv.style.display = "none";

    ingredientDiv.innerHTML = "";
    const createIngredientDiv = document.createElement('div');
    createIngredientDiv.className = 'ingredient-meal';
    const ingredientInfo = `
    <img src="${mealIngredientDetails.strMealThumb}" class="img-fluid w-100">
    <h3 class="roboto-font">${mealIngredientDetails.strMeal}</h3>
    <h4 class="roboto-font">Ingredients</h4>
   `;
    const ul = document.createElement('ul');
    const ingredientList = [mealIngredientDetails.strIngredient1, mealIngredientDetails.strIngredient2, mealIngredientDetails.strIngredient3,
    mealIngredientDetails.strIngredient4, mealIngredientDetails.strIngredient5, mealIngredientDetails.strIngredient6, mealIngredientDetails.strIngredient7, mealIngredientDetails.strIngredient8, mealIngredientDetails.strIngredient9, mealIngredientDetails.strIngredient10, mealIngredientDetails.strIngredient11, mealIngredientDetails.strIngredient12, mealIngredientDetails.strIngredient13, mealIngredientDetails.strIngredient14, mealIngredientDetails.strIngredient15, mealIngredientDetails.strIngredient16, mealIngredientDetails.strIngredient17, mealIngredientDetails.strIngredient18, mealIngredientDetails.strIngredient19, mealIngredientDetails.strIngredient20
    ];
    ingredientList.forEach(ingredient => {
        if (ingredient == "" || ingredient == null) {
        }
        else {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-square check-icon"></i>  ${ingredient}`;
            ul.appendChild(li);
        }
    });
    const button = document.createElement('button');
    button.className = "btn btn-danger decoration-button";
    button.innerText = "Close";
    button.onclick = hideIngredient;

    createIngredientDiv.innerHTML = ingredientInfo;
    ingredientDiv.appendChild(createIngredientDiv);
    ingredientDiv.appendChild(ul);
    ingredientDiv.appendChild(button);
}

const hideIngredient = () => {

    const ingredientDiv = document.getElementById('display-ingredients');
    ingredientDiv.style.display = "none";
    const mealDiv = document.getElementById('display-meals');
    mealDiv.style.display = "grid";
}
