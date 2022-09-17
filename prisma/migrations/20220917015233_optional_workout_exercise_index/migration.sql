-- AlterTable
CREATE SEQUENCE "workoutexercise_index_seq";
ALTER TABLE "WorkoutExercise" ALTER COLUMN "index" DROP NOT NULL,
ALTER COLUMN "index" SET DEFAULT nextval('workoutexercise_index_seq');
ALTER SEQUENCE "workoutexercise_index_seq" OWNED BY "WorkoutExercise"."index";
