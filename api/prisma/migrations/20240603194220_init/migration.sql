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

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "cpf" TEXT,
    "phone" TEXT,
    "dateRegistration" DATETIME
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "location" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "EventParticipation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "volunteerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" TEXT,
    CONSTRAINT "EventParticipation_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EventParticipation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
