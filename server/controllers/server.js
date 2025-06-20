const express = require('express');
const cors = require('cors');
const server = express();
const Board = require('./Board');
const Card = require('./Card');

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
    const { title, category, author } = req.body;
    try {
        const board = await Board.createBoard(title, category, author || 'Anonymous');
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
        const cards = await Card.getCardsByBoardId(id);
        return res.status(200).json(cards);
    } catch (err) {
        next({status: 500, message: 'Error getting cards'});
    }
})

server.post('/card', async (req, res, next) => {
    const { title, description, gif, owner, board_id } = req.body;
    try {
        const card = await Card.createCard(title, description, gif, owner || 'Anonymous', board_id);
        return res.status(201).json(card);
    } catch (err) {
        console.error('Error creating card:', err);
        next({status: 500, message: err.message || 'Error creating card'});
    }
})

server.put('/card/:id/upvote', async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await Card.upvoteCard(id);
        return res.status(200).json(card);
    } catch (err) {
        next({status: 500, message: 'Error upvoting card'});
    }
})

server.put('/card/:id/pin', async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await Card.pinCard(id);
        return res.status(200).json(card);
    } catch (err) {
        next({status: 500, message: 'Error pinning card'});
    }
})

server.put('/card/:id/unpin', async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await Card.unpinCard(id);
        return res.status(200).json(card);
    } catch (err) {
        next({status: 500, message: 'Error unpinning card'});
    }
})

server.delete('/card/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await Card.deleteCard(id);
        return res.status(200).json(card);
    } catch (err) {
        next({status: 500, message: 'Error deleting card'});
    }
})


server.use((err, req, res, next) => {
    console.error('Error:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, status });
})




module.exports = server;
