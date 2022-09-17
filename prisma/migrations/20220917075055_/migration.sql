/*
  Warnings:

  - Added the required column `index` to the `WorkoutSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" ALTER COLUMN "index" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "index" INTEGER NOT NULL;
