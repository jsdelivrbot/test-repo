const PORT = process.env.PORT || 5000;

let express = require('express');
let app     = express();
const bodyParser = require("body-parser");
let path    = require("path");

let multer = require('multer');
let upload = multer();
let uploadedBuffer;
let testBuffer;

let pressButt = 0;
let count = 0;

app.use(bodyParser.urlencoded({  extended: true}));

app.use(bodyParser.json()); 
app.use(bodyParser.text()); 





app.get('/want-image', function(req, res) {
  res.send("" + pressButt);
  pressButt = 0;
});

app.get('/want-image-press', function(req, res) {  
  res.send("pressButt was " + pressButt);
  pressButt = 1;
});

app.get('/recieve', function(req, res) {
	++count;
	res.send("recieved");
});

app.get('/recieved', function(req, res) {
  res.send(""+count);
});






app.post('/img-get', upload.single('image'), function(req, res, next) {

  uploadedBuffer = req.file.buffer;
  res.send("recieved");
});


app.get('/img-get', function(req,res){
  res.send(uploadedBuffer);
});

app.post('/img-get-text', function(req,res){
  testBuffer = req.body;
  res.send("recieved as text");
});

app.get('/img-get-text', function(req,res){
  res.send(testBuffer);
});


app.get('/', function (req, res) {  
	res.send("open");
});

// error handling
app.use(function(err, req, res, next) {  console.error(err.stack);  res.status(500).send('Something bad happened!');
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = app ;