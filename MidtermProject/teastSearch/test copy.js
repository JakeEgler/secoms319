/*
fetch("/home/jtegler/Documents/GitHub/secoms319/MidtermProject/data.json")
  .then((response) => response.json())
  .then((json) => console.log(json));
  */
const jsondata = require("../data.json");
var videos = jsondata;

var render = function (data) {
  var videosHTMLString =
    "<ul>" +
    data
      .map(function (video) {
        return (
          "<li>" +
          "<strong>Title: </strong>" +
          video.title +
          "<br/>" +
          "<strong>Author: </strong>" +
          video.creator +
          "<br/>" +
          "<strong>Category: </strong>" +
          video.category +
          "<br/>" +
          "<strong>Release Date: </strong>" +
          video.release +
          "<br/>" +
          "</li>"
        );
      })
      .join("");
  +"</ul>";

  console.log(videosHTMLString);
};
render(videos);
