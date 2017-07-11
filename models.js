
exports = module.exports = function(db, mongoose) {
  require('./schemas/Tweet')(db, mongoose);
  require('./schemas/TweetComplete')(db, mongoose);
};
