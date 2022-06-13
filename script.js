console.log('JS OK!');

// * Recupero tutti gli elementi dal DOM
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');
const suggestionParagraph = document.querySelector('.suggestion')

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

  // * Preparo i dati per la chiamata API
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = '613360f9278a6f99821f64660a79a1b8';
  const lang = 'it';
  const units = 'metric';
  const endPoint = 'https://api.openweathermap.org/data/2.5/weather';

  // * Costruisco l'Uri per la chiamata API
  const apiUri = `${endPoint}?lon=${lon}&lat=${lat}&units=${units}&lang=${lang}&appid=${apiKey}`;
  console.log(apiUri);

  // * Faccio la chiamata
  fetch(apiUri)
    .then(function (res) {
      const data = res.json();
      return data;
    }).
    then(function (data) {
      console.log(data);

      // * Estraggo le info che mi servono
      const locationName = data.name;
      const temperature = Math.floor(data.main.temp);
      const wind = data.wind.speed;
      const humidity = data.main.humidity;
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      // * Prendo il consiglio da mostrare nel suggestion-panel
      const suggestion = getSuggestion(iconCode);

      // * Inserisco gli altri dati
      weatherLocation.innerText = locationName;
      weatherTemperature.innerHTML = `<h6>temp</h6>${temperature}°`;
      weatherHumidity.innerHTML = `<h6>umidità</h6> ${humidity} %`;
      weatherWind.innerHTML = `<h6>vento</h6>${wind} Km/h`;
      weatherIcon.alt = description;
      weatherIcon.src = `images/${iconCode}.png`;

      suggestionParagraph.innerText = suggestion;

      // * Rimuovo la classe 'js-loading
      rootElement.classList.remove('js-loading');
    });
}

// * Funzione per i suggerimenti
function getSuggestion(code) {
  const suggestions = {
    '01d': 'Ricordati la crema solare!',
    '01n': 'Buonanotte!',
    '02d': 'Oggi il sole va e viene...',
    '02n': 'Attenti ai lupi mannari...',
    '03d': 'Luce perfetta per fare foto!',
    '03n': 'Dormi sereno :)',
    '04d': 'Che cielo grigio :(',
    '04n': 'Non si vede nemmeno la luna!',
    '09d': 'Prendi l\'ombrello',
    '09n': 'Copriti bene!',
    '10d': 'Prendi l\'ombrello',
    '10n': 'Copriti bene!',
    '11d': 'Attento ai fulmini!',
    '11n': 'I lampi accendono la notte!',
    '13d': 'Esci a fare un pupazzo di neve!',
    '13n': 'Notte perfetta per stare sotto il piumone!',
    '50d': 'Accendi i fendinebbia!',
    '50n': 'Guida con prudenza!',
  }

  return suggestions[code];
}