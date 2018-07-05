const http = require('http');

const api = require('./api.json');

/**
 * Prints the temperature of a city for given city name on the console
 * @param {string} city - The city name, replace spaces by +, eg New+York
 */
function get(city) {
	try {
		// Connect to the API
		const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${api.key}`
		const request = http.get(url, response => {
			const statusCode = response.statusCode;

			// if HTTP request is successful
			if (statusCode === 200) {
				let responseBody = "";
				// Read the data
				response.on('data', data => responseBody += data.toString());
				response.on('end', () => {
					try {	
						// Parse the data
						const profile = JSON.parse(responseBody);

						// Print out temperature, the default unit is Kelvin
						console.log(`The temperature in ${profile.city.name} is ${Math.round(profile.list[0].main.temp-273)}°C`);
					} catch (e) {
						// Error parsing data
						console.error(e.message);
					}
				});
			} else {
				// Response error
				console.error(`Can't get the temperature for ${city} (${http.STATUS_CODES[statusCode]})`);
			}
		});
		// Request error
		request.on('error', e => console.error(e.message));
	} catch (e) { 
		// Error establishing connection
		console.error(e.message);
	}
}

module.exports.get = get;
