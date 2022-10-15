let searchButton = document.querySelector('.search-button');
let countryInput = document.querySelector('.county-inp');
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
            //let INR = data[0].currencies.INR.name;
            let languages = Object.values(data[0].languages).toString().split(",").join(", ");
            result.innerHTML = `
            <img src= " ${flag}" class="flag-img">
            <h2> ${common} </h2>
            <div class="wrapper">
                <div class="data-wrapper">  
                    <h4> Capital: </h4>
                    <span> ${capital} </span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">  
                    <h4> Continent: </h4>
                    <span> ${continent} </span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">  
                    <h4> Population: </h4>
                     <span> ${data[0].population} </span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">  
                    <h4> Currency: </h4>
                 <span>   ${currency}  </span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">  
                    <h4> Common languages: </h4>
                    <span> ${languages} </span>
                </div>
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

        });

});