const express = require('express');
var router = require('express').Router();
var Article = mongoose.model('Item');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('article', function(req, res, next, slug) {
    Article.findOne({ slug: slug})
        .populate('author')
        .then(function (article) {
            if (!article) { return res.sendStatus(404); }

            req.article = article;

            return next();
        }).catch(next);
});

router.param('comment', function(req, res, next, id) {
    Comment.findById(id).then(function(comment){
        if(!comment) { return res.sendStatus(404); }

        req.comment = comment;

        return next();
    }).catch(next);
});


function createRouter(db) {
  const router = express.Router();

  router.post('/api/items', (req, res, next) => {
    // const owner = req.user.email;
    db.query(
      'INSERT INTO items () VALUES ()',
      [],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/api/items', function (req, res, next) {
      let itemCount = 0;
      db.query(
          'SELECT COUNT (id) as itemCount FROM Items',
          // [owner, 10*(req.params.page || 0)],

          (error, resultsCount) => {
              if (error) {
                  console.log(error);
                  res.status(500).json({status: 'error'});
              } else {
                  //res.status(200).json({"items":resultsCount[0].itemCount});
                  db.query(
                      'SELECT * FROM Items LIMIT '+req.query.limit+' OFFSET '+req.query.offset,
                      // [owner, 10*(req.params.page || 0)],

                      (error, results) => {
                          if (error) {
                              console.log(error);
                              res.status(500).json({status: 'error'});
                          } else {
                              res.status(200).json({
                                  "itemCount":resultsCount[0].itemCount,
                                  "author": {
                                      "username": "odutko",
                                      "bio": "",
                                      "image": "https://findicons.com/files/icons/1200/indiana_jones_and_the_last_crusade/128/grail_tablet.png",
                                      "following": false
                                  },
                                  "items":results});
                          }
                      }
                  );
              }
          }
      );


  });

  router.put('/api/items/:id', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      'UPDATE items SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/api/items/:id', function (req, res, next) {
    const owner = req.user.email;
    db.query(
      'DELETE FROM items WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
