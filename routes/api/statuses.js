const express = require('express');

function createRouter(db) {
  const router = express.Router();
  router.post('/api/statuses', (req, res, next) => {
    // const owner = req.user.email;
    db.query(
      'INSERT INTO statuses () VALUES (?,?,?)',
      [owner, req.body.name, req.body.description, new Date(req.body.date)],
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

  router.get('/api/statuses', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      // 'SELECT id, name, description, date FROM events WHERE owner=? ORDER BY date LIMIT 10 OFFSET ?',
      'SELECT * FROM statuses',
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

  router.put('/api/statuses/:id', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      'UPDATE statuses SET name=?, description=?, date=? WHERE id=?',
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

  router.delete('/api/statuses/:id', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      'DELETE FROM statuses WHERE id=?',
      // [req.params.id, owner],
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
