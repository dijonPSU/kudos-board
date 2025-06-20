const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
    async getCommentsByCardId(cardId) {
        try {
            const comments = await prisma.comment.findMany({
                where: { card_id: parseInt(cardId) },
                orderBy: { createdAt: 'desc' }
            });
            return comments;
        } catch (error) {
            console.error("Error in getCommentsByCardId:", error);
            throw error;
        }
    },

    async createComment(message, author, cardId) {
        try {
            console.log("Creating comment with:", { message, author, cardId });
            const comment = await prisma.comment.create({
                data: {
                    message,
                    author: author || 'Anonymous',
                    card: { connect: { card_id: parseInt(cardId) } }
                }
            });
            return comment;
        } catch (error) {
            console.error("Error in createComment:", error);
            throw error;
        }
    },

    async deleteComment(id) {
        try {
            const comment = await prisma.comment.delete({
                where: { comment_id: parseInt(id) }
            });
            return comment;
        } catch (error) {
            console.error("Error in deleteComment:", error);
            throw error;
        }
    }
}
