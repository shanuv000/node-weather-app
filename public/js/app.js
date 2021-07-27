console.log("Client Side JavaScript has Loaded");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msgone = document.querySelector("#msg-1");
const msgtwo = document.querySelector("#msg-2");
// const images = (document.querySelector("#w-img").src =
//   "https://static01.nyt.com/images/2014/12/11/technology/personaltech/11machin-illo/11machin-illo-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale");
// msgone.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElement.value;
  //   console.log(`shanu is my ${location}`);
  msgone.textContent = "Loading...";
  msgtwo.textContent = "";
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return console.log(data.error);
        // return (msgone.textContent = data.error);
      }
      msgone.textContent = data.forecastData;
      msgtwo.textContent = data.location;
      document.querySelector("#w-img").src = data.images;
      console.log(data.location);
    });
  });
});
