-- CreateTable
CREATE TABLE "Donor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "cpf" TEXT,
    "dateRegistration" DATETIME
);

-- CreateTable
CREATE TABLE "Donatary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "cpf" TEXT,
    "dateRegistration" DATETIME
);

-- CreateTable
CREATE TABLE "Family" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "numberMembers" INTEGER,
    "dateRegistration" DATETIME,
    "bairro" TEXT
);

-- CreateTable
CREATE TABLE "DonationDelivered" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "donataryId" INTEGER NOT NULL,
    CONSTRAINT "DonationDelivered_donataryId_fkey" FOREIGN KEY ("donataryId") REFERENCES "Donatary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DonationReceived" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "donorId" INTEGER NOT NULL,
    CONSTRAINT "DonationReceived_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable for Item
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "dateAdded" DATETIME NOT NULL
);

-- CreateTable for User
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "role" TEXT NOT NULL CHECK ("role" IN ('admin', 'donor', 'volunteer', 'donatary')),
    "dateRegistration" DATETIME NOT NULL
);
