/*
  Warnings:

  - You are about to drop the column `index` on the `ExerciseOnWorkoutTemplate` table. All the data in the column will be lost.
  - Added the required column `exerciseIndex` to the `ExerciseOnWorkoutTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseOnWorkoutTemplate" DROP COLUMN "index",
ADD COLUMN     "exerciseIndex" INTEGER NOT NULL;
