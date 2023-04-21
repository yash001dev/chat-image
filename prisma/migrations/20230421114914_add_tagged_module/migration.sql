-- CreateTable
CREATE TABLE "TaggedUser" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TaggedUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaggedUser" ADD CONSTRAINT "TaggedUser_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaggedUser" ADD CONSTRAINT "TaggedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
