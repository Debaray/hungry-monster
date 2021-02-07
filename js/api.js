const filterMeal = () => {
    const searchBox = document.getElementById('search-box').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
        .catch(err => console.log(err));
}

const displayMeals = meals => {
    const mealDiv = document.getElementById('display-meals');
    mealDiv.innerHTML = "";
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
    });
}

const mealDetail = idMeal => {


    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayIngredients(data.meals[0]))
        .catch(err => console.log(err));
   // console.log("clicked", idMeal);

}
const displayIngredients = mealIngredientDetails => {
    

    const ingredientDiv = document.getElementById('display-ingredients');
    ingredientDiv.style.display ="block";
    const mealDiv = document.getElementById('display-meals');
    mealDiv.style.display ="none";
    ingredientDiv.innerHTML ="";
    const createIngredientDiv = document.createElement('div');
    createIngredientDiv.className = 'ingredient-meal';
    const ingredientInfo = `
    <img src="${mealIngredientDetails.strMealThumb}" class="img-fluid w-100">
    <h3 class="roboto-font">${mealIngredientDetails.strMeal}</h3>
    <h4 class="roboto-font">Ingredients</h4>
   `;
   const ul = document.createElement('ul');
   const ingredientList = [mealIngredientDetails.strIngredient1,mealIngredientDetails.strIngredient2,mealIngredientDetails.strIngredient3,
    mealIngredientDetails.strIngredient4,mealIngredientDetails.strIngredient5,mealIngredientDetails.strIngredient6,mealIngredientDetails.strIngredient7,mealIngredientDetails.strIngredient8,mealIngredientDetails.strIngredient9,mealIngredientDetails.strIngredient10,mealIngredientDetails.strIngredient11,mealIngredientDetails.strIngredient12,mealIngredientDetails.strIngredient13,mealIngredientDetails.strIngredient14,mealIngredientDetails.strIngredient15,mealIngredientDetails.strIngredient16,mealIngredientDetails.strIngredient17,mealIngredientDetails.strIngredient18,mealIngredientDetails.strIngredient19,mealIngredientDetails.strIngredient20
];
   
ingredientList.forEach(ingredient => {
    if(ingredient ==="")
    {     
    }
    else{
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

const hideIngredient = () =>{
    const ingredientDiv = document.getElementById('display-ingredients');
    ingredientDiv.style.display ="none";
    const mealDiv = document.getElementById('display-meals');
    mealDiv.style.display ="grid";
}
