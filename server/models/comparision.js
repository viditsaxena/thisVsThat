var mongoose = require('mongoose');

var ComparisionSchema = new mongoose.Schema({
       name: {type: String},
      items: [
        {
          name: {type: String},
          votes: {type: String}
        }
      ]
});

var Comparision = mongoose.model('Comparision', ComparisionSchema);



module.exports = Comparision;
