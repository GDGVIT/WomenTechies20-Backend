//jshint esversion:6
const router = require("express").Router();
const request = require("request");
const verify = require("./verifyToken");
var access_token = process.env.ACCESS_TOKEN;
var user_id = process.env.USER_ID;
//make a post request to get the hashtag required
router.post("/", verify, (req, res) => {
  var hashtag = req.body.hashtag;
  var baseURL = "https://graph.facebook.com/ig_hashtag_search?user_id=";
  var finalURL =
    baseURL + user_id + "&q=" + hashtag + "&access_token=" + access_token;
  //make requst to get id of the hashtag
  request(finalURL, function(error, response, body) {
    hashtagID = JSON.parse(body).data[0].id;//get the id of the hashtag
    //use the id in the url
    var url =
      "https://graph.facebook.com/" +
      hashtagID +
      "/recent_media?user_id=" +
      user_id +
      "&fields=permalink,caption,comments_count,like_count,media_type,media_url&access_token=" +
      access_token;
    //make request to fetch recent media related to that hashtag
    request(url, (_error, _response, body) => {
      res.send(JSON.parse(body));
    });
  });
});

module.exports = router;
