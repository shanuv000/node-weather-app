const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const path = require("path");

const hbs = require("hbs");
//define paths for express config
const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Shanu" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Here to Help",
    message: "I am here to help.",
    name: "Vaibhav",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Shanu" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ err: "You Must Provide an Address." });
  }

  geoCode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, forecastData, images) => {
      if (error) {
        return res.send({ error });
      }
      console.log(location);
      console.log(forecastData);
      res.send({
        forecastData,
        location,
        address: req.query.address,
        images,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must define a search term" });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page Not available",
    name: "404 Shanu",
    errorMessage: "404 Help Page",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not available",
    name: "404 Shanu",
    errorMessage: "404 Page",
  });
});

app.listen(port, () => {
  console.log("Server is Up on port 3000");
});
