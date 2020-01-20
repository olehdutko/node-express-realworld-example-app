var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var ItemSchema = new mongoose.Schema({
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

ItemSchema.plugin(uniqueValidator, {message: 'is already taken'});

ItemSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

ItemSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ItemSchema.methods.updateFavoriteCount = function() {
  var iten = this;

  return User.count({favorites: {$in: [iten._id]}}).then(function(count){
    iten.favoritesCount = count;

    return iten.save();
  });
};

ItemSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
      title: this.title,
      intNomer: this.intNomer,
      id: this.id,
      source: this.source,
      type: this.type,
      ownType: this.ownType,
      date: this.date,
      seller: this.seller,
      sellerPhone: this.sellerPhone,
      sellerCard: this.sellerCard,
      sellerData: this.sellerData,
      findPlace: this.findPlace,
      gps: this.gps,
      UAH: this.UAH,
      bids: this.bids,
      forumLink: this.forumLink,
      itemInfo: this.itemInfo,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Item', ItemSchema);
