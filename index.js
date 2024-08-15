const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '612ce0aa74e34786f7ce5e2276995dbd';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    // Faire la requête à l'API OpenWeather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            // Si la réponse n'est pas OK (exemple: 404), on la traite ici
            if (!response.ok) {
                if (response.status === 404) {
                    // Gérer l'affichage de l'erreur 404
                    container.style.height = '400px';
                    weatherBox.style.display = 'none';
                    weatherDetails.style.display = 'none';
                    error404.style.display = 'block';
                    error404.classList.add('fadeIn');
                }
                throw new Error(`Erreur: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            // Si nous recevons une bonne réponse (pas d'erreur 404), traiter les données météo
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Affichage des données météo en fonction des conditions
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Affichage des boîtes d'informations météo
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '470px';
        })
        .catch(error => {
            console.log(error);
            // Ne pas afficher une alerte en cas de 404, seulement en cas d'autres erreurs
            if (error.message !== 'Erreur: Not Found') {
                alert("Erreur lors de la récupération des données météo.");
            }
        });
});

// CHANGEMENT THEME
const themetogglecheckbox = document.querySelector (".theme-toggler-checkbox");
const body = document.querySelector("body");

let isDay = true ; //jour par défaut

themetogglecheckbox.addEventListener("change", () => {
    body.classList.toggle("nuit");
});

themetogglecheckbox.addEventListener("change", () => {
    if(isDay) {
        body.classList.remove("jour");
        body.classList.add("nuit");
    } else {
        body.classList.add("jour");
        body.classList.remove("nuit");
    }
    isDay =!isDay;
});
