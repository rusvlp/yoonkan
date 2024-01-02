require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require("path");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

const start = async () => {
    try{
        app.listen(PORT);
    } catch (e){
        console.log(e);
    }
}

start();