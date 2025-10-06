-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "jobInfoId" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_jobInfoId_fkey" FOREIGN KEY ("jobInfoId") REFERENCES "JobInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
