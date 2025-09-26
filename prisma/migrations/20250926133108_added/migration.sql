-- CreateEnum
CREATE TYPE "public"."Experience" AS ENUM ('Entry', 'Mid', 'Senior');

-- CreateTable
CREATE TABLE "public"."JobInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "experience" "public"."Experience" NOT NULL DEFAULT 'Entry',
    "description" TEXT NOT NULL,

    CONSTRAINT "JobInfo_pkey" PRIMARY KEY ("id")
);
