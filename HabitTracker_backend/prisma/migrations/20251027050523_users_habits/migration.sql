-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Habits" (
    "id" SERIAL NOT NULL,
    "habit_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "askAI" TEXT NOT NULL,
    "AIsuggestions" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Habits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Habits" ADD CONSTRAINT "Habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
