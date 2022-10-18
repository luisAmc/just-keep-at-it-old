/*
  Warnings:

  - Made the column `mins` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kcal` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lbs` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reps` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkoutSet" ALTER COLUMN "mins" SET NOT NULL,
ALTER COLUMN "distance" SET NOT NULL,
ALTER COLUMN "kcal" SET NOT NULL,
ALTER COLUMN "lbs" SET NOT NULL,
ALTER COLUMN "reps" SET NOT NULL;
