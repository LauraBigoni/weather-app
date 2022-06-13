console.log('JS OK!');

// * Recupero tutti gli elementi dal DOM
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');

const rootElement = document.documentElement;

// * Recupero la posizione
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

// * Funzione da eseguire in caso di errore di geolocalizzazione
function onError(error) {
  console.log('error');
  weatherLocation.innerHTML = `<h3>Devi attivare la geolocalizazione</h3>`;
}

// * Funzione da eseguire in caso di successo
function onSuccess(position) {
  console.log('success', position);

}