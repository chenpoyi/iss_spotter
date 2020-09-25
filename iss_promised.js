// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/*
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);

  const ip = data['ip'];

  const url = `https://ipvigilante.com/${ip}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body)['data'];
  const longitude = data['longitude'];
  const latitude = data['latitude'];
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function(body){
  return fetchMyIP()
  .then(body => fetchCoordsByIP(body))
  .then(body => fetchISSFlyOverTimes(body))
  .then(body => {
    const data = JSON.parse(body)['response'];
    return data;
  });
}



module.exports = { nextISSTimesForMyLocation };