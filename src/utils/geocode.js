const request = require("request");

const geoCode = (address, callback) => {
  url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2hhbnV2MDAwc2giLCJhIjoiY2tybWwweGRsMWZjNjJwcDhycWV1b3ZjNCJ9.mR0WRzE7AOE9RDHRSwjtew&limit=1";

  request({ url, json: true }, (error, { body }) => {
    const features = body.features;
    if (error) {
      callback("Unable to Connect to weather services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location.", undefined);
    } else {
      callback(undefined, {
        long: features[0].center[0],
        lat: features[0].center[1],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
