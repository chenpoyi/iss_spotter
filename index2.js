const { nextISSTimesForMyLocation } = require('./iss_promised');

const printTimes = function(times) {
  for (const time of times) {
    const risetime = time['risetime'];
    const duration = time['duration'];
    let date = new Date(0);
    date.setUTCSeconds(risetime);
    const dateString = date.toString();
    
    console.log(`Next pass at ${dateString} for ${duration} seconds!`);


  }
};

nextISSTimesForMyLocation()
.then((times) => {
  printTimes(times);
})
.catch((err) => {
  console.log("It didn't work: ", err.message);
});