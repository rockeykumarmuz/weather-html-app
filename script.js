const API_KEY = 'PLEASE_ADD_API_KEY_HERE'
const weatherHeader = document.getElementById('weather-header')

const locationElement = document.getElementById('location')
const temperatureElement = document.getElementById('temperature')
const descriptionElement = document.getElementById('description')
const humidityElement = document.getElementById('humidity')
const windElement = document.getElementById('wind')

const cityButtons = document.querySelectorAll('.city-card')
const searchBtn = document.getElementById('searchBtn')
const searchInput = document.getElementById('searchInput')

// Mapping all cities to background class to fit the background image
const bgClasses = {
	france: 'bg-france',
	'north africa': 'bg-north-africa',
	qatar: 'bg-qatar',
	japan: 'bg-japan',
}

//  updater fnction to update wether after an api call or while intitial page render
function updateWeather(data, cityKey = '') {
	const { name, sys, main, weather, wind } = data

	locationElement.textContent = `${name.toUpperCase()}, ${sys?.country || ''}`
	temperatureElement.textContent = `${(main.temp - 273.15).toFixed(1)}°C`
	descriptionElement.textContent = weather[0].description.toUpperCase()
	humidityElement.textContent = `${main.humidity}%`
	windElement.textContent = `${wind.speed} K/M`

	// Remove all bg-* classes to update the new one
	weatherHeader.className = ''
	weatherHeader.classList.add(cityKey ? bgClasses[cityKey] : 'bg-default')
}

// api calling to fetch the weather details
async function fetchWeatherDetails(city, cityKey = '') {
	try {
		const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
		if (!res.ok) throw new Error(`Weather Details for ${city} not foud!`)
		const data = await res.json()
		updateWeather(data, cityKey)
	} catch (error) {
		alert(error.message)
	}
}

// City card click functionality implemented here
cityButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		const city = btn.dataset.city
		fetchWeatherDetails(city, city)
	})
})

// Search box
searchBtn.addEventListener('click', () => {
	const city = searchInput.value.trim()
	if (city) {
		fetchWeatherDetails(city.toLowerCase(), '')
	}
})

// Default city france here
fetchWeatherDetails('france', 'france')
