-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "taggedUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_taggedUserId_fkey" FOREIGN KEY ("taggedUserId") REFERENCES "TaggedUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
