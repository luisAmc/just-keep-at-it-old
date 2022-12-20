/*
  Warnings:

  - You are about to drop the column `templateId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_templateId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "templateId";

-- CreateTable
CREATE TABLE "ExerciseOnWorkoutTemplate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "workoutTemplateId" TEXT,

    CONSTRAINT "ExerciseOnWorkoutTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseOnWorkoutTemplate" ADD CONSTRAINT "ExerciseOnWorkoutTemplate_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseOnWorkoutTemplate" ADD CONSTRAINT "ExerciseOnWorkoutTemplate_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "WorkoutTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
