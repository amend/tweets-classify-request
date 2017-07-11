
exports = module.exports = function(db, mongoose) {
  var tweetSchema = new mongoose.Schema({
    text: String,
    geo: {
      coordinates: [ ]
    },
    created_at: String,
  });

  db.model('Tweet', tweetSchema, 'austintweets');
}
