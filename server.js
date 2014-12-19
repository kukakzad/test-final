livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/public");

/* ======================================= */

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var format = require('util').format;

var collectionStore = null;
var collectionUser  = null;
/* ======================================= */

var port = 4000;
var express = require('express');
var app = express();

app.use(express.static('./public/'));

app.get('/addUser',function(request,response){
    var newData = {
      user: request.query.user,
      pass: request.query.pass
    };
    collectionUser.insert(newData,function(err,result){
      if(err) throw err;
      console.log(result);
    })
});
app.get('/checkUser/', function(req, res) {
    var find = {};
    if (req.query.user!=""&&req.query.user!=null) {
        find.user = req.query.user;
          if (req.query.pass!=""&&req.query.pass!=null) {
            find.pass = req.query.pass;
            collectionUser.find(find).toArray(function(err, result) {
              res.send(JSON.stringify(result));
            });
          }
    }
});

app.get('/addProduct',function(request,response)
{
  var insertData = {
    product_id:     request.query.product_id,
    product:        request.query.product,
    price:          request.query.price,
    done:           request.query.done,
    user:           request.query.user
  };

  collectionStore.insert(insertData,function()
  {
    response.send('Success');
  });
});

app.get('/getProducts',function(request,response)
{
  var find = {};

  if(request.params.user)
    find.user = request.params.user;

  collectionStore.find(find).toArray(function(err,result)
  {
    response.send(JSON.stringify(result));
  });
});

app.get('/updateProduct/:product_id',function(request,response)
{
  var find = {};
  var newData = {};
  if(request.params.product_id)
    find._id = new ObjectID(request.params.product_id);

  if(request.query.product)
    newData.product = request.query.product;
  if(request.query.price)
    newData.price = request.query.price;
    console.log(newData);
  collectionStore.update(find,{'$set':newData},function(err,result)
  {
    response.send('Success');
  });
});

app.get('/deleteProduct/:product_id',function(request,response)
{
  var find = {};
  if(request.params.product_id)
    find._id = new ObjectID(request.params.product_id);

  collectionStore.remove(find,function(err,result)
  {
    if(err)
      response.send(err);
    else
    response.send('Success');
  });
});



MongoClient.connect('mongodb://root:1234@linus.mongohq.com:10059/Kittitouch', function(err, db) {
  if(err) throw err;
  collectionStore = db.collection('store');
  collectionUser  = db.collection('user');
  app.listen(port);
  console.log("\nhttp://127.0.0.1:"+port+"\n");
});
