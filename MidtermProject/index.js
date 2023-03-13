const jsondata = require("./data.json");
var videos = jsondata;

var render = function (data) {
  data
    .map(function (video) {
      return video.thumbnail;
    })
    .join("");
  +"</ul>";

  console.log(videosHTMLString);
};
render(videos);
