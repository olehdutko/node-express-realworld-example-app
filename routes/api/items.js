const express = require('express');
var router = require('express').Router();

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
    // const owner = req.user.email;
      //console.log('SELECT * FROM Items');
    db.query(
      'SELECT * FROM Items',
      // [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
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
