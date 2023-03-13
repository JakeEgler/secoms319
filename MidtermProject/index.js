const jsondata = require("./data.json");
var videos = jsondata;
/*
var render = function (data) {
  thumbnail = data.map(function (video) {
    return video.thumbnail;
  });
  return thumbnail;
};
console.log(render(videos));
*/

var info = function (data) {
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
info(videos);
