let input = document.querySelector("input");
let button = document.querySelector("button");
let tempElement = document.querySelector(".temp");
let locationElement = document.querySelector(".location");
let humidityElement = document.querySelector(".humidity");
let conditionTextElement = document.querySelector(".condition p");
let conditionImgElement = document.querySelector(".condition img");
let loadingImg = document.querySelector(".loading");
button.addEventListener("click", () => {
  getWeather(input.value);
});
getWeather("london");

async function getWeather(location) {
  try {
    loading();
    let data = await getWeatherInfo(location);
    let processedData = processData(data);
    renderData(processedData);
  } catch (err) {
    console.log("something Went Wrong" + err);
    getWeather("london");
  } finally {
    finishLoading();
  }
}
async function getWeatherInfo(location) {
  loading();
  let request = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=0465f41f95974ac78aa30827231409&q=${location}`
  );
  let data = await request.json();
  return data;
}
function processData(data) {
  let outPut = {
    location: data.location.name,
    country: data.location.country,
    temp: data.current.temp_c,
    humidity: data.current.humidity,
    condition: data.current.condition.text,
    conditionIcon: data.current.condition.icon,
  };
  return outPut;
}
function renderData(data) {
  tempElement.innerText = `${data.temp}°`;
  locationElement.innerText = `${data.country} - ${data.location}`;
  humidityElement.innerText = `Humidity : ${data.humidity}`;
  conditionTextElement.innerText = data.condition;
  conditionImgElement.src = data.conditionIcon;
  finishLoading();
}
function loading() {
  loadingImg.style.display = "block";
}
function finishLoading() {
  loadingImg.style.display = "none";
}
