
var request = require('request');
var config = require('./config');
var mongoose = require('mongoose');

var db = mongoose.createConnection(config.mongodb.uri);
db.on('error', console.error.bind(console, 'mongoose connection error: '));
db.once('open', function () {
  //and... we have a data store
});
require('./models')(db, mongoose);

db.models.Tweet.find({}, function(err, tweets) {
    if (err) { console.error('error', err.stack); return;}

    var a = ['a', 'b', 'c'];

    var i = 0;
    tweets.forEach(function(tweet) {
      request.post({url:'http://sentiment.vivekn.com/api/text/',
        form: {
          txt: tweet.text}
        }, function(err, res, body){
          if (err) { console.error('error', err.stack); return;}

          /*
          console.log("**** 1 ****");
          console.log('i: ' + i);
          console.log('text: ' + tweet.text);

          console.log('body.result.sentiment: ' + body.result.sentiment);
          console.log('body.result.confidence: ' + body.result.confidence);
          i++;
          console.log('**** 2 ****');
          */

          body = JSON.parse(body);
          var t = {
            text: tweet.text,
            geo: {
              coordinates: tweet.geo.coordinates
            },
            created_at: tweet.created_at,
            sentiment: body.result.sentiment,
            confidence: body.result.confidence
          };
          console.log('t: ' + JSON.stringify(t));
          db.models.TweetComplete(t).save(function(err, savedTweet) {
            if (err) { console.error('error', err.stack); return;}

            console.log('i: ' + i);
            console.log('text: ' + tweet.text);

            console.log('body: ' + body);
            console.log('body.result.sentiment: ' + body.result.sentiment);
            console.log('body.result.confidence: ' + body.result.confidence);
            i++;

            console.log('savedTweet: ' + JSON.stringify(savedTweet));
          });
      });
    });
});
