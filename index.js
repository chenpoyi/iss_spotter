// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = function(times){
  for(const time of times){
    const risetime = time['risetime'];
    const duration = time['duration'];
    let date = new Date(0);
    date.setUTCSeconds(risetime);
    const dateString = date.toString();
    
    console.log(`Next pass at ${dateString} for ${duration} seconds!`);


  }
}




nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printTimes(passTimes);
});