const express = require('express');
const cors = require('cors');

const server = express();
const Board = require('./Board');

server.use(express.json());
server.use(cors());


server.get('/', (req, res, next) => {
    try{
        const board = Board.getBoards();
    } catch (err) {
        next({status: 500, message: 'Error getting board'});
    }


})





server.use((err, req, res, next) => {
    const {message, status} = err;
    res.status(404).json({ message: 'Not found' });
})




module.exports = server;
