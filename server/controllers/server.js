const express = require('express');
const cors = require('cors');
const server = express();
const Board = require('./Board');

server.use(express.json());
server.use(cors());


server.get('/', async (req, res, next) => {
    try {
        const boards = await Board.getBoards();
        return res.status(200).json(boards);
    } catch (err) {
        next({status: 500, message: 'Error getting boards'});
    }
})

server.get('/board/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const board = await Board.getBoardById(id);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        return res.status(200).json(board);
    } catch (err) {
        next({status: 500, message: 'Error getting board'});
    }
})

server.post('/board', async (req, res, next) => {
    const { name, category, author } = req.body;
    try {
        const board = await Board.createBoard(name, category, author || 'Anonymous');
        return res.status(201).json(board);
    } catch (err) {
        console.error('Error creating board:', err);
        next({status: 500, message: err.message || 'Error creating board'});
    }
})

server.delete('/board/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const board = await Board.deleteBoard(id);
        return res.status(200).json(board);
    } catch (err) {
        next({status: 500, message: 'Error deleting board'});
    }
})


server.get('/cards/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const cards = await Board.getCardsByBoardId(id);
        return res.status(200).json(cards);
    } catch (err) {
        next({status: 500, message: 'Error getting cards'});
    }
})


server.use((err, req, res, next) => {
    console.error('Error:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, status });
})




module.exports = server;
