// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const ip = '173.181.0.232';

// fetchCoordsByIP(ip, (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);


// });

// const coordinates = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(coordinates, (error, data)=>{
//   if(error){
//     console.log("fetchISSFlyoverTimes didnt work: ", error);
//   }

//   console.log(data);
// });