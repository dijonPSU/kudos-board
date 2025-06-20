const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
    async getCards(){
        const cards = await prisma.card.findMany();
        return cards;

    },

    async getCardsByBoardId(boardId) {
        try {
            const cards = await prisma.card.findMany({
                where: { board_id: parseInt(boardId) },
                orderBy: [
                    { isPinned: 'desc' },
                    { pinnedAt: 'desc' },
                    { createdAt: 'desc' }
                ]
            });
            return cards;
        } catch (error) {
            console.error("Error in getCardsByBoardId:", error);
            throw error;
        }
    },

    async createCard(title, description, gif, owner, boardId) {
        try {
            console.log("Creating card with:", { title, description, gif, owner, boardId });
            const card = await prisma.card.create({
                data: {
                    title,
                    description,
                    gif,
                    owner,
                    votes: 0,
                    board: {
                        connect: { board_id: parseInt(boardId) }
                    }
                }
            });
            return card;
        } catch (error) {
            console.error("Error in createCard:", error);
            throw error;
        }
    },

    async upvoteCard(id) {
        try {
            const card = await prisma.card.update({
                where: { card_id: parseInt(id) },
                data: {
                    votes: {
                        increment: 1
                    }
                }
            });
            return card;
        } catch (error) {
            console.error("Error in upvoteCard:", error);
            throw error;
        }
    },

    async deleteCard(id) {
        try {
            const card = await prisma.card.delete({
                where: { card_id: parseInt(id) }
            });
            return card;
        } catch (error) {
            console.error("Error in deleteCard:", error);
            throw error;
        }
    },

    async pinCard(id) {
        try {
            const card = await prisma.card.update({
                where: { card_id: parseInt(id) },
                data: {
                    isPinned: true,
                    pinnedAt: new Date()
                }
            });
            return card;
        } catch (error) {
            console.error("Error in pinCard:", error);
            throw error;
        }
    },

    async unpinCard(id) {
        try {
            const card = await prisma.card.update({
                where: { card_id: parseInt(id) },
                data: {
                    isPinned: false,
                    pinnedAt: null
                }
            });
            return card;
        } catch (error) {
            console.error("Error in unpinCard:", error);
            throw error;
        }
    }
}
