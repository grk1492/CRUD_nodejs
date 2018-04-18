const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Config de la db
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connection à la db
mongoose.connect(dbConfig.url)
.then(()=>{
	console.log("Connection à la db avec succès");
}).catch(err =>{
	console.log('Connection impossible à la db');
	process.exit();
});

//route slash
app.get('/',(req,res)=>{
	res.json({"message":"Welcome to Our App"});
});

//On inclut les routes
require('./app/routes/note.routes.js')(app);

app.listen(7777,()=>{
	console.log('Server running on port 7777');
});