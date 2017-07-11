
exports = module.exports = function(db, mongoose) {
  var TweetCompleteSchema = new mongoose.Schema({
    text: String,
    geo: {
      coordinates: [ ]
    },
    created_at: String,
    sentiment: String,
    confidence: String
  });

  db.model('TweetComplete', TweetCompleteSchema, 'austintweets_complete');
}
