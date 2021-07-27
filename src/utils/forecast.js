const request = require("request");

const forecast = (long, lat, callback) => {
  const access_key = "aeba2699c87dbff87859bdb68e32bf68";
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    access_key +
    "&query=" +
    lat +
    "," +
    long +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    // const location = response.body.location;
    // const current = response.body.current;
    console.log(body);
    if (error) {
      callback("Unable to Connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find Location.", undefined);
    } else {
      callback(
        undefined,

        body.current.weather_descriptions[0] +
          ". It is Currently " +
          body.current.temperature +
          " degree Outside and it feels Like " +
          body.current.feelslike +
          " degree in " +
          " and there is " +
          body.current.precip +
          "% chance of rain in " +
          body.location.name,
        body.current.weather_icons
      );
    }
  });
};
module.exports = forecast;
