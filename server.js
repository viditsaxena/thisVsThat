  //Load Application tools
  var express     =    require('express'),
      bodyParser  =    require('body-parser'),
      mongoose    =    require('mongoose'),
      morgan      =    require('morgan');



  var app = express();

// Database

  mongoose.connect('mongodb://localhost/thisvsthatdb');

  // *** Server Logging ***
  app.use(morgan('dev'));

// Setting Public Folder
  app.use(express.static(__dirname + "/client"));


// Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Routes
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
  });

  // *** Routing/Controllers ***
  var UsersController = require('./server/controllers/users');
  app.use('/api/users', UsersController);
  var ComparisionsController = require('./server/controllers/comparisions');
  app.use('/api/comparisions', ComparisionsController);


  app.listen(8080, function(){
    console.log('This is a MEAN app');
  });
