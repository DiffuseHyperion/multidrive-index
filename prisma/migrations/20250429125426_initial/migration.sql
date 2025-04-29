-- CreateTable
CREATE TABLE "Account" (
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "MSALAccount" (
    "homeAccountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MSALAccount_pkey" PRIMARY KEY ("homeAccountId")
);

-- CreateTable
CREATE TABLE "AccountCache" (
    "id" TEXT NOT NULL,
    "authorityType" TEXT NOT NULL,
    "clientInfo" TEXT,
    "environment" TEXT NOT NULL,
    "homeAccountId" TEXT NOT NULL,
    "lastModificationApp" TEXT,
    "lastModificationTime" TEXT,
    "localAccountId" TEXT NOT NULL,
    "name" TEXT,
    "realm" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "AccountCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantProfileCache" (
    "tenantId" TEXT NOT NULL,
    "localAccountId" TEXT NOT NULL,
    "name" TEXT,
    "isHomeTenant" BOOLEAN,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "TenantProfileCache_pkey" PRIMARY KEY ("tenantId","accountId")
);

-- CreateTable
CREATE TABLE "IdTokenCache" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "credentialType" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "homeAccountId" TEXT NOT NULL,
    "realm" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "IdTokenCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessTokenCache" (
    "id" TEXT NOT NULL,
    "cachedAt" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "credentialType" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "expiresOn" TEXT NOT NULL,
    "extendedExpiresOn" TEXT,
    "homeAccountId" TEXT NOT NULL,
    "keyId" TEXT,
    "realm" TEXT NOT NULL,
    "refreshOn" TEXT,
    "requestedClaims" TEXT,
    "requestedClaimsHash" TEXT,
    "secret" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "tokenType" TEXT,
    "userAssertionHash" TEXT,

    CONSTRAINT "AccessTokenCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshTokenCache" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "credentialType" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "familyId" TEXT,
    "homeAccountId" TEXT NOT NULL,
    "realm" TEXT,
    "secret" TEXT NOT NULL,
    "target" TEXT,

    CONSTRAINT "RefreshTokenCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppMetadataCache" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "familyId" TEXT,

    CONSTRAINT "AppMetadataCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MSALAccount_homeAccountId_key" ON "MSALAccount"("homeAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountCache_id_key" ON "AccountCache"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IdTokenCache_id_key" ON "IdTokenCache"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccessTokenCache_id_key" ON "AccessTokenCache"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokenCache_id_key" ON "RefreshTokenCache"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AppMetadataCache_id_key" ON "AppMetadataCache"("id");

-- AddForeignKey
ALTER TABLE "TenantProfileCache" ADD CONSTRAINT "TenantProfileCache_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AccountCache"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
