const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org/?format=json';
  request(url, (err, response, body) => {

    if (err) {
      return callback(err, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data['ip'];
    
    if (ip) {
      return callback(null, ip);
    }
    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipvigilante.com/${ip}`;
  request(url, (err, response, body)=> {//make request to ipvigilante
    if (err) { //if request has an error
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) { //if non-200, assume server error
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //proceed with data
    const data = JSON.parse(body)['data'];
    const coordinates = {};
    coordinates['longitude'] = data['longitude'];
    coordinates['latitude'] = data['latitude'];

    return callback(null, coordinates);
  });
};



/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const latitude = coords['latitude'];
  const longitude = coords['longitude'];
  
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) { //if non-200, assume server error
      const msg = `Status Code ${response.statusCode} when fly-over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const times = JSON.parse(body)['response'];

    callback(null, times);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

