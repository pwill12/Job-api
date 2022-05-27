const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const app = express()

app.get('/',function (req,res) {
    res.send('hello will')
})

app.listen(8000,function () {
    console.log('started')
})