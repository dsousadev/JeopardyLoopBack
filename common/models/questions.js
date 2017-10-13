'use strict';

module.exports = function(Questions) {
  Questions.random = cb => {
    Questions.getDataSource().connector.connect((err, db) => {
      const collection = db.collection('questions');
      collection.aggregate({$sample: {size: 1}}, (err, data) => {
        if (err) return cb(err);
        return cb(null, data);
      });
    });
  };

  Questions.remoteMethod('random', {
    http: {
      path: '/random',
      verb: 'get',
    },
    description: 'Gets one random question',
    returns: {
      arg: 'questions',
      type: 'json',
    },
  });
};
