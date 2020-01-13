var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var ArticleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},

    title: String,
    intNomer: String,
    id: String,
    source: String,
    type: String,
    ownType: String,
    date: String,
    seller: String,
    sellerPhone: String,
    sellerCard: String,
    sellerData: String,
    findPlace: String,
    gps: String,
    UAH: String,
    bids: String,
    forumLink: String,
    itemInfo: String,

    favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

ArticleSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

ArticleSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ArticleSchema.methods.updateFavoriteCount = function() {
  var article = this;

  return User.count({favorites: {$in: [article._id]}}).then(function(count){
    article.favoritesCount = count;

    return article.save();
  });
};

ArticleSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,

      title: this.title,
      intNomer: this.title,
      id: this.title,
      source: this.title,
      type: this.title,
      ownType: this.title,
      date: this.title,
      seller: this.title,
      sellerPhone: this.title,
      sellerCard: this.title,
      sellerData: this.title,
      findPlace: this.title,
      gps: this.title,
      UAH: this.title,
      bids: this.title,
      forumLink: this.title,
      itemInfo: this.title,

    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Article', ArticleSchema);
