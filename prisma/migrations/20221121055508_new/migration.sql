/*
  Warnings:

  - Added the required column `id_user_role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_user_role" TEXT NOT NULL;
