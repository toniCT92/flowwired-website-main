/*
  Warnings:

  - You are about to drop the column `message` on the `CustomRequest` table. All the data in the column will be lost.
  - Added the required column `useCase` to the `CustomRequest` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `CustomRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `CustomRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "useCase" TEXT NOT NULL,
    "budget" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_CustomRequest" ("createdAt", "email", "id", "name") SELECT "createdAt", "email", "id", "name" FROM "CustomRequest";
DROP TABLE "CustomRequest";
ALTER TABLE "new_CustomRequest" RENAME TO "CustomRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
