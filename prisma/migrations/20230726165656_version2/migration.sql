-- CreateTable
CREATE TABLE "Chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsersOnChats" (
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "chatId"),
    CONSTRAINT "UsersOnChats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnChats_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ChatsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ChatsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChatsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatsToUsers_AB_unique" ON "_ChatsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatsToUsers_B_index" ON "_ChatsToUsers"("B");
