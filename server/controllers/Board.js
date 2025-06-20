const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
    async getBoards() {
        try {
            const boards = await prisma.board.findMany();
            return boards;
        } catch (error) {
            console.error("Error in getBoards:", error);
            throw error;
        }
    },

    async getBoardById(id) {
        try {
            const board = await prisma.board.findUnique({
                where: { board_id: parseInt(id) }, include: {cards: true}
            });
            return board;
        } catch (error) {
            console.error("Error in getBoardById:", error);
            throw error;
        }
    },

    async createBoard(title, category, author) {
        try {
            console.log("Creating board with:", { title, category, author });
            const board = await prisma.board.create({data: {title, category, owner: author }});
            return board;
        } catch (error) {
            throw error;
        }
    },

    async deleteBoard(id) {
        try {
            const board = await prisma.board.delete({
                where: { board_id: parseInt(id) }
            });
            return board;
        } catch (error) {
            console.error("Error in deleteBoard:", error);
            throw error;
        }
    }


}
