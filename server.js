var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const Transaction = require('./mongoose/transaction');


var app = express();
app.use(bodyParser.json());


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var connection_url = "";
//var url ="mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate-mongo?retryWrites=true&w=majority";

var server;
//var server = require('./app');
var port = 3600;
// Connect to the db 
var connection_url = "169.57.56.202:30659";

//
var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";
MongoClient.connect(url , function(err, mongoclient) {
  if(err) {
    console.log("Mongo DB connection failed");
    return console.dir(err);
  }
  console.log("Mongo DB connection successful");



});

app.post('/api/transactions/create', function (req, res) {

    var body = req.body;
    console.log(JSON.stringify(body));
   // res.send(body);

    var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";


    MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

  
  //console.log(JSON.stringify(newAccount));

  var database = mongoclient.db("innovate");
  var collection;

  database.createCollection('transactions', function(err1, collection) {
 

 var newTransaction = [{
    uuid: req.body.uuid,
    name: req.body.name,
    amount: req.body.amount,
    currency: req.body.currency,
    description: req.body.description,
    date: req.body.date,
    cat: req.body.cat,
    type: req.body.type,
    key: req.body.key,
    total: req.body.total


 }
];

 collection = database.collection('transactions');


  collection.insert(newTransaction, function(err2, result) {
      if (!err2) {
       // console.log("Docs inserted in Collection 'transactions'.");
        //res.send("Docs inserted in Collection 'accountdetails");
        res.status(200).send({'message': 'Done!'});

      }else{
        //console.log("No docs inserted in Collection 'transactions'.");

        res.status(500).send(err2);
      }

       

     
    });

  });
  
   });


});





app.post('/api/transactions/getold', function (req, res) {
var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

//const query = await Transaction.find({ uuid: '3031' }); // will return Worf and La Forge
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'
   // const query = { uuid:req.body.uuid};


    const options = {
      // sort matched documents in descending order by rating
      sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, amount: 1,currency:1, description:1,date:1,category:1 },
    };
    const transaction = await transactions.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly

    if (transaction==null) {
        console.log('Transaction not found');
        res.status(500).send({'err': 'Transaction not found'});
        return;
    }

    res.status(200).send(transaction);

    //res.status(200).send("Transaction has been foundRES");
    console.log("Transaction has been foundCON");

    //console.log(transaction);
    //await client.close();
    //res.status(200).send(movie

    }finally {
        await client.close();
      }
    }
      run().catch(console.dir);


      });

});





app.post('/api/transactions/get', function (req, res) {

MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});



app.post('/api/transactions/get_groceries', function (req, res) {


MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 1
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});





app.post('/api/transactions/get_eatouts', function (req, res) {


MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 2
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});


app.post('/api/transactions/get_transport', function (req, res) {


MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 3
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});





app.post('/api/transactions/get_bills', function (req, res) {


MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 4
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});




app.post('/api/transactions/get_holidays', function (req, res) {


MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 7
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});





app.post('/api/transactions/get_expenses', function (req, res) {


MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 5
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});




app.post('/api/transactions/get_cash', function (req, res) {



MongoClient.connect(url , function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

var o = {} // empty Object
var key = 'Data';
o[key] = []; // empty Array, which you can push() values into


async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    // since this method returns the matched document, not a cursor, print it directly
    
    //res.send(transactions);
    
    /*
    const query = {
        key: req.body.key
      };
    */  
    

    
    const query = {
        uuid: req.body.uuid,
        type: 6
      };
    


    //res.status(200).send(results);

    //JSONArray ja = new JSONArray();
    
    transactions.find(query).toArray(function(err, items) {
         // res.status(200).send(items);
          //o[key].push(items);
          //res.status(200).send(JSON.stringify(o));
          res.status(200).send(items);
      });
    
    
    //console.log("All Transactions ");
    //res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
    run().catch(console.dir);


    });

});







app.post('/api/transactions/getcategory', function (req, res) {
var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }


const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'
    const query = { uuid:req.body.uuid};

    const options = {
      // sort matched documents in descending order by rating
      sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, amount: 1,currency:1, description:1,date:1,category:1 },
    };
    const transaction = await transactions.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly

    if (transaction==null) {
        console.log('Transaction not found');
        res.status(500).send({'err': 'Transaction not found'});
        return;
    }

    res.status(200).send(transaction.category);

    //res.status(200).send("Transaction has been foundRES");
    console.log("Transaction has been foundCON");

    //console.log(transaction);
    //await client.close();
    //res.status(200).send(movie

    }finally {
        await client.close();
      }
    }
      run().catch(console.dir);


      });

});



app.get('/api/transactions/drop', function (req, res) {
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db("innovate");
    const transactions = database.collection("transactions");
    // Query for a movie that has the title 'The Room'

    transactions.drop();
    // since this method returns the matched document, not a cursor, print it directly
    
    console.log("Transactions collection has been droped");
    res.status(200).send({'message': 'Done!'});



    }finally {
        await client.close();
      }
    }
      run().catch(console.dir);


      });

});




app.get('/', function (req, res) {
    res.end( "Rest API implementation for Microservice TRANSACTIONS " );
});

var port = 3600;

var server = app.listen(port, function () {
  console.log("Transactions service listening on " + port);
});

