let searchButton = document.querySelector('.search-button');
let countryInput = document.querySelector('.county-inp');
let resultCountries = document.querySelector('.result-countries');
let resultMeals = document.querySelector('.result-meals');


searchButton.addEventListener("click", () => {
    var countryName = countryInput.value.trim();
    var languages;       // selected country languages
    var mealsList; // selected meals JSON lists
    var sCountry; // selected country JSON

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((country) => { return country.json(); })
        .then((country) => {
            sCountry = country;
            languages = Object.values(sCountry[0].languages)[0];
            return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${languages}`);
        })
        .then((meals) => {
            return meals.json();
        })
        .then((meals) => {
            mealsList = meals;
        })
        .then(() => {
            let flag = sCountry[0].flags.svg;
            let common = sCountry[0].name.common;
            let capital = sCountry[0].capital[0];
            let continent = sCountry[0].continents[0];
            let currency = Object.keys(sCountry[0].currencies)[0];
            let INR = sCountry[0].currencies[currency].name;

            let mLm = mealsList.meals;

            resultCountries.innerHTML = `
                <img src= " ${flag}" class="flag-img">
                <h2> ${common} </h2>
                <div class="country-items">  
                    <h4> Capital: </h4>
                    <span> ${capital} </span>
                </div>
                <div class="country-items">  
                    <h4> Continent: </h4>
                    <span> ${continent} </span>
                </div>    
                <div class="country-items">  
                    <h4> Population: </h4>
                    <span> ${sCountry[0].population} </span>
                </div>    
                <div class="country-items">  
                    <h4> Currency: </h4>
                    <span>   ${currency} - ${INR}  </span>
                </div>  
                <div class="country-items">  
                    <h4> Common languages: ${languages}</h4>
                </div>
                 `;
            resultMeals.innerHTML = "";
            for (let meal of mLm) {
                resultMeals.innerHTML += `
                    <div class="meals">  
                        <div class="meal-items"> 
                            <h4> Food: </h4>
                            <p> ${meal.strMeal} </p> 
                        </div>
                        <img class="meals-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" />       
                    </div>
                    `;
            }
        })
        .catch(() => {
            if (countryName.length == 0) {
                resultCountries.innerHTML = `<h3> Country name cannot be empty !! </h3>`;
                resultMeals.innerHTML = '';
            }
            else if (sCountry.status === 404) {
                resultCountries.innerHTML = `<h3> Not found ${countryName} country. </h3>`;
                resultMeals.innerHTML = '';
            }
            else if ((mealsList.meals === null)) {
                resultMeals.innerHTML = `<h3> Not found ${languages} meals. </h3>
                <h3> Try again !!!  </h3>
                `;
            }
            else {
                resultCountries.innerHTML = `<h3> Invalid country. Try again !! </h3>`;
                resultMeals.innerHTML = '';
            }
        });

});

var input = document.getElementById("myInput");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});