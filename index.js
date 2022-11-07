"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
let html;
const renderCountry = function (data,className='country') {
	
   html = `
	<article class="${className}">
		
		<img class="country_flag" src = "${data.flag}"/>
		<div class="countrt_data">
			<h3 class="country_name">${data.name}</h3>
			<h3 class="country_region">${data.region}</h3>
			<p class="country__row"><span>👪 </span>${+(data.population / 1000000).toFixed(1)}
        Million People</p>
			<p class="country__row"><span>🗣 </span>${data.languages[0].name} </p>
			<p class="country__row"><span>💰 </span>${data.currencies[0].name} </p>
		</div>
	</article>
	`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};



const getCountryData = function(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response=>response.json())
  .then(data=>{
	renderCountry(data[0])
	const neighbour = data[0].borders[0];
	if(!neighbour) return;
	return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)

  })
  .then(response => response.json())
  .then(data=>renderCountry(data,'neighbour'))
  .catch(err => console.error(`${err} 💣 💣 💣`))

}

document.getElementsByClassName("countries")[0].innnerHTML="";
btn.addEventListener('click',function(){
	
	getCountryData(`${document.getElementsByClassName("country-name")[0].value}`);
	countriesContainer.innerHTML = "";	

});
