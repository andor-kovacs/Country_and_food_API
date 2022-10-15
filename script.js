let searchButton = document.querySelector('.search-button');
let countryInput = document.querySelector('.county-inp');
let result = document.querySelector('.result');

searchButton.addEventListener("click", () => {
    let countryName = "India";
    let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(URL)

    fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
            let flag = data[0].flags.svg;
            console.log(data[0].name.official);
            console.log(data[0].capital[0]);
            console.log(flag);
            console.log(data[0].name.common);
            console.log(data[0].continents[0]);
            console.log(Object.keys(data[0].currencies)[0]);
            console.log(data[0].currencies.INR.name);
            console.log(
                Object.values(data[0].languages).toString().split(",").join(", ")
            );

            result.innerHTML = `
            <img src= " ${flag}" class="flag-img">
            `;
        });

});