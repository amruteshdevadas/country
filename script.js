// header section has the search bar and search nutton where user can enter the country name
var header = document.createElement("div")
header.className="header"

header.innerHTML=`
<h2 class ="header"> Conrty API</h2>
<input type="text" name="" id="search_cont" placeholder = "Search for a country" class ="search-bar">
<button onclick ="getData()" id="search_btn">Search</button>
`
document.body.append(header)

//getData gets called by the click of search button
async function getData() 
{
  // clearing the contents of page for new results to render
  refreshList()
//taking the text entered by user
let input = document.getElementById("search_cont").value
// condition to check whether there is any input if not alert will popped up
if(input)
{
// url for the api
  const url = `https://restcountries.eu/rest/v2/name/${input}?fullText=true`;

const response = await fetch(url)
let status = response.status;
//condition for checking the status of response if not found alert will be popped up
  if(status!=404)
  {
    country_list = await response.json()
    loadData(country_list)
  }
  else{
    noResults();
  }

}
else
{
  noResults();
}

}


function loadData(country_list)
{ //rendering the data on the page 
const outer_container = document.createElement("div");
country_list.className="outer_container"; 
  

  country_list.forEach((country) => 
{

  const userContainer = document.createElement("div");
  userContainer.className="container"
  userContainer.innerHTML = `

 
    <img class="image" src=${country.flag}> </img>
    <h6 class="user-name">${country.name}</h6>
    <p class = "text"> Population :<span class="text1">${country.population} </span> </p>
    <p class = "text"> Region : <span class="text1">${country.region} </span></p>
    <p class = "text"> Capital : <span class="text1">${country.capital} </span></p>
    `;
  outer_container.append(userContainer);
});

document.body.append(outer_container);
document.getElementById("search_cont").value ="";

};
// refresh function to remove the elements
function refreshList()
{ 
$(".container").remove()
}
// fuction calledwhenever there is no input and entered a wrong country
function noResults()
{
alert("Enter Valid Name!!!")
}

