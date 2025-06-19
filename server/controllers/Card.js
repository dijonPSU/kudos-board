const { default: getCards } = require("../../client/components/webRequests");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();


module.exports = {
    async getCards(){
        const cards = await prisma.cards.findMany();
        return cards;

    }


}
