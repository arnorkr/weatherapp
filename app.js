/**
 * Prints the name temperature of the city name passed as a console argument
 * @example node app.js New York
 */

const weather = require('./weather');

// Join multiple values passed as arguments and replace all spaces with '+'
const city = process.argv.slice(2).join("+").replace(' ', '+');

weather.get(city);