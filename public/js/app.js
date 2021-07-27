console.log("Client Side JavaScript has Loaded");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msgone = document.querySelector("#msg-1");
const msgtwo = document.querySelector("#msg-2");

// msgone.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElement.value;
  //   console.log(`shanu is my ${location}`);
  msgone.textContent = "Loading...";
  msgtwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return console.log(data.error);
        // return (msgone.textContent = data.error);
      }
      msgone.textContent = data.forecastData;
      msgtwo.textContent = data.location;
      console.log(data.location);
    });
  });
});
