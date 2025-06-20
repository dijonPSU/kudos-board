/*
  Warnings:

  - Made the column `title` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `owner` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gif` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `votes` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `board_id` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_board_id_fkey";

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "owner" SET NOT NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pinnedAt" TIMESTAMP(3),
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "gif" SET NOT NULL,
ALTER COLUMN "votes" SET NOT NULL,
ALTER COLUMN "board_id" SET NOT NULL;

ALTER TABLE "Card" ADD CONSTRAINT "Card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("board_id") ON DELETE RESTRICT ON UPDATE CASCADE;


UPDATE "Board" SET "title" = 'Untitled Board' WHERE "title" IS NULL;


DELETE FROM "Card" WHERE "board_id" IS NULL;
