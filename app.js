const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const  cors = require('cors');

const userRoutes = require('./routes/user')

const dotnev = require('dotenv');
dotnev.config();

const sequelize=require('./util/database')


app.use(cors())

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRoutes)


sequelize.sync({force:true})
// sequelize.sync()
.then(()=>{
   
    app.listen(3000);
})
.catch(err=>{
    console.log("ttgg"+err)})