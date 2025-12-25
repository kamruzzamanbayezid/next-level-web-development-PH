-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropIndex
DROP INDEX "Profile_id_key";

-- AlterTable
CREATE SEQUENCE profile_id_seq;
ALTER TABLE "Profile" ALTER COLUMN "id" SET DEFAULT nextval('profile_id_seq');
ALTER SEQUENCE profile_id_seq OWNED BY "Profile"."id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
