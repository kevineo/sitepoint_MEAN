var mongoose = require('mongoose');
var schema = mongoose.Schema;

var EmployeeSchema = new schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },

  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  image: {
    type: String,
    default: 'images/user.png'
  },
  address: {
    lines: {
      type: [String]
    },
    postal: {
      type: String
    },
    city: {
      type: String
    }
  }
});

var db = mongoose.connection;
var dbUrl = 'mongodb://kevineo:mongo123456@ds153775.mlab.com:53775/kevineo_mean_lab'
var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

var Team = mongoose.model('Team', TeamSchema);

db.on('error', function() {
  console.log('there was an error communicating with the DB');
});

mongoose.connect(dbUrl, function (err) {
  if (err) {
    return console.log('there was a problem connecting to the database' + err);
  }

  console.log('connected!');
  var team = new Team({
    name: 'Product Development'
  });

  team.save(function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.dir(data);
    }

    db.close();
    process.exit();
  });
});