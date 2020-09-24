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

module.exports = { fetchMyIP, fetchCoordsByIP };



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });