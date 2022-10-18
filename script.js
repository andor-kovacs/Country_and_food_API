let searchButton = document.querySelector('.search-button');
let countryInput = document.querySelector('.county-inp');
let searchMeal = document.querySelector('.meals');

let result = document.querySelector('.result');

searchButton.addEventListener("click", () => {
    let countryName = countryInput.value;
    let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
            let flag = data[0].flags.svg;
            let common = data[0].name.common;
            let capital = data[0].capital[0];
            let continent = data[0].continents[0];
            let currency = Object.keys(data[0].currencies)[0];
            let INR = data[0].currencies[Object.keys(data[0].currencies)].name;
            let languages = Object.values(data[0].languages).toString().split(",").join(", ");
            var demo = data[0].demonyms.eng.f;
            result.innerHTML = `
            <img src= " ${flag}" class="flag-img">
            <h2> ${common} </h2>
            <div class="items">  
                <h4> Capital: </h4>
                <span> ${capital} </span>
            </div>
            <div class="items">  
                <h4> Continent: </h4>
                <span> ${continent} </span>
            </div>    
            <div class="items">  
                <h4> Population: </h4>
                <span> ${data[0].population} </span>
            </div>    
            <div class="items">  
                <h4> Currency: </h4>
                <span>   ${currency} - ${INR}  </span>
            </div>  
            <div class="items">  
                <h4> Common languages: </h4>
                <button class="meals"> ${languages} </button>
            </div>
            `;

        })
        .catch(() => {
            if (countryName.length == 0) {
                result.innerHTML = `<h3> Cannot be empty !! </h3>`
            }
            else {
                result.innerHTML = `<h3> Invalid country. Try again !! </h3>`
            }
            return demo;
        });

}
);

searchMeal.addEventListener("click", () => {
    let mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=spanish`;
    fetch(mealUrl)
        .then((response) => response.json())
        .then((data2) => {
            console.log(data2.meals);
            // for (let i = 0; i < data2.meals.length; i++) {
            //     console.log(data2.meals[i].strMeal);
            //     console.log(data2.meals);


            // let csak = data2.meals[0].strMeal;
            // <img src= " ${data2.meals[0].strMealThumb}" class="flag-img">
        });
});
