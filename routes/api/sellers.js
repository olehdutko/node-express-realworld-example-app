var router = require('express').Router();


function createRouter(db) {
  router.post('/api/sellers', (req, res, next) => {
    // const owner = req.user.email;
    db.query(
      'INSERT INTO sellers () VALUES (?,?,?)',
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

  router.get('/api/sellers', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      'SELECT * FROM sellers',
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

  router.put('/api/sellers/:id', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      'UPDATE sellers SET name=?, description=?, date=? WHERE id=?',
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

  router.delete('/api/sellers/:id', function (req, res, next) {
    // const owner = req.user.email;
    db.query(
      'DELETE FROM sellers WHERE id=?',
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
