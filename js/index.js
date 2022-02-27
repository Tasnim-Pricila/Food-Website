// Error Message 

const errorMessage = document.getElementById('error-message');
const emptyMessage = () => {
    errorMessage.style.display = 'block';
    errorMessage.innerText = "Input Field is Empty";
}
const stringMessage = () => {
    document.getElementById('search-text').value = '';
    errorMessage.style.display = 'block';
    errorMessage.innerText = "Enter a string";
}
const foodNotExist =  () => {
    document.getElementById('search-text').value = '';
    errorMessage.style.display = 'block';
    errorMessage.innerText = "Sorry !!! This Food doesn't exist";
}

// Loading Spinner 

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Load By Chicken Breast as a First Load ------------------------------------

const loadByChicken = (areaName) => {
    document.getElementById('show-food').textContent = '';
    toggleSpinner('block');
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
    fetch(url)
    .then(response => response.json())
    .then(data => showFoodsByFilter(data.meals));
}
loadByChicken();

// Search Foods 

const loadFoods = () => {
    document.getElementById('show-food').textContent = '';
    const searchText = document.getElementById('search-text');
    const searchTextValue = searchText.value;
    if(searchText.value === ''){
        emptyMessage();
    }
    else if(!isNaN(searchText.value)){
        stringMessage();
    }    
    else{      
        toggleSpinner('block');
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTextValue}`)
        .then(response => response.json())
        .then(data => {
            if(data.meals === null){
               foodNotExist();
            }
            else{
                searchText.value = '';
                showFoods(data.meals);
            }
            toggleSpinner('none');
        });
    }
}

// Display Meals -------------------------------

const showFoods = foods => {  
    const showFood = document.getElementById('show-food');
    // showFood.textContent = '';
    foods.forEach(food => {       
        // console.log(food);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <p class="card-text mt-4"> ${food.strInstructions.slice(0, 150)}... </p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <button data-bs-toggle="modal" data-bs-target="#readMore" class="btn btn-outline-primary read-more-btn" onclick="loadSingleFood(${food.idMeal})"> Read More </button>
                  <a href="${food.strYoutube}"> <i class="fa-brands fa-youtube fa-3x"></i> </a>
                </div>
            </div>
        `;
        showFood.appendChild(div);
    });
    toggleSpinner('none');
}


// Load One MealDetails by food ID----------------------------

const loadSingleFood = foodId => {   
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(response => response.json())
    .then(data => readDetails(data.meals[0]));
}

// View Read More Button 

const readDetails = (food) => {
    const details = document.getElementById('modal-content');
    details.innerHTML = `  
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${food.strMeal}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img src="${food.strMealThumb}" class="card-img-top img-fluid" alt="...">
            <h5 class="mt-4 fw-bold"> Instructions </h5>
            <p class="mt-4"> ${food.strInstructions} </p>
            <h5 class="my-4 fw-bold"> Ingredients: </h5>
            <p> <b> ${food.strIngredient1}:</b> ${food.strMeasure1} </p>
            <p> <b> ${food.strIngredient2}:</b> ${food.strMeasure2} </p>
            <p> <b> ${food.strIngredient3}:</b> ${food.strMeasure3} </p>
            <p> <b> ${food.strIngredient4}:</b> ${food.strMeasure4} </p>
            <p> <b> ${food.strIngredient5}:</b> ${food.strMeasure5} </p>
            <p> <b> ${food.strIngredient6}:</b> ${food.strMeasure6} </p>
            <p> <b> ${food.strIngredient7}:</b> ${food.strMeasure7} </p>
            <p> <b> ${food.strIngredient8}:</b> ${food.strMeasure8} </p>
            <p> <b> ${food.strIngredient9}:</b> ${food.strMeasure9} </p>           
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;   
}


// Load By Categories ------------------------------------

const loadByCategories = (categoryName) => {
    document.getElementById('show-food').textContent = '';
    toggleSpinner('block');
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    fetch(url)
    .then(response => response.json())
    .then(data => showFoodsByFilter(data.meals));
}

// Load By Area ------------------------------------

const loadByArea = (areaName) => {
    document.getElementById('show-food').textContent = '';
    toggleSpinner('block');
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    fetch(url)
    .then(response => response.json())
    .then(data => showFoodsByFilter(data.meals));
}

// Load By First Letter ------------------------------------

const loadByLetter = (firstLetter) => {
    document.getElementById('show-food').textContent = '';
    toggleSpinner('block');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    fetch(url)
    .then(response => response.json())
    .then(data =>  {
        if(data.meals === null){
           foodNotExist();
        }
        else{
            showFoods(data.meals);
        }
        toggleSpinner('none');
    });
}


// Show Foods After Filter 

const showFoodsByFilter = foods => {  
    const showFood = document.getElementById('show-food');
    foods.forEach(food => {       
        // console.log(food);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `          
                <div class="card h-100 p-3">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${food.strMeal}</h5>
                    </div>
                    <div>
                        <button data-bs-toggle="modal" data-bs-target="#readMore" class="btn btn-outline-primary" onclick="loadSingleFood(${food.idMeal})"> Read More </button>
                    </div>                
                </div>           
        `;
        showFood.appendChild(div);
    });
    toggleSpinner('none');
}

