-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('administrador', 'mesa_de_partes', 'funcionario');

-- CreateEnum
CREATE TYPE "public"."DocumentStatus" AS ENUM ('creado', 'recibido', 'derivado', 'en_revision', 'observado', 'atendido', 'archivado', 'rechazado');

-- CreateEnum
CREATE TYPE "public"."ApplicantType" AS ENUM ('natural', 'juridica');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('CARTA', 'DIRECTIVA', 'EXPOSICIÓN_DE_MOTIVOS', 'INFORME', 'MEMORANDO', 'MEMORANDO_MULTIPLE', 'NOTA_DE_ELEVACIÓN', 'OFICIO', 'OFICIO_CIRCULAR', 'OFICIO_MULTIPLE', 'AYUDA_MEMORIA', 'OTROS', 'PROVEIDO', 'RESOLUCIÓN', 'RESOLUCIÓN_JEFATURAL', 'RESOLUCIÓN_VICEMINISTERIAL', 'RESUMEN_EJECUTIVO', 'SOBRE_CERRADO', 'SOLICITUD');

-- CreateTable
CREATE TABLE "public"."Office" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT,
    "isMainOffice" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentOfficeId" TEXT,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "officeId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "trackingCode" TEXT NOT NULL,
    "futCode" TEXT,
    "applicantType" "public"."ApplicantType" NOT NULL,
    "applicantIdentifier" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantLastname" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "applicantPhone" TEXT,
    "applicantAddress" TEXT,
    "documentType" "public"."DocumentType" NOT NULL,
    "subject" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "currentStatus" "public"."DocumentStatus" NOT NULL DEFAULT 'creado',
    "currentOfficeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DocumentAttachment" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "DocumentAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DocumentHistory" (
    "id" TEXT NOT NULL,
    "statusAtMoment" "public"."DocumentStatus" NOT NULL,
    "observation" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentId" TEXT NOT NULL,
    "fromOfficeId" TEXT,
    "toOfficeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DocumentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Office_name_key" ON "public"."Office"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "public"."User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Document_trackingCode_key" ON "public"."Document"("trackingCode");

-- CreateIndex
CREATE UNIQUE INDEX "Document_futCode_key" ON "public"."Document"("futCode");

-- CreateIndex
CREATE INDEX "Document_trackingCode_idx" ON "public"."Document"("trackingCode");

-- CreateIndex
CREATE INDEX "Document_futCode_idx" ON "public"."Document"("futCode");

-- CreateIndex
CREATE INDEX "Document_currentOfficeId_idx" ON "public"."Document"("currentOfficeId");

-- CreateIndex
CREATE INDEX "DocumentHistory_documentId_idx" ON "public"."DocumentHistory"("documentId");

-- AddForeignKey
ALTER TABLE "public"."Office" ADD CONSTRAINT "Office_parentOfficeId_fkey" FOREIGN KEY ("parentOfficeId") REFERENCES "public"."Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "public"."Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_currentOfficeId_fkey" FOREIGN KEY ("currentOfficeId") REFERENCES "public"."Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentAttachment" ADD CONSTRAINT "DocumentAttachment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "public"."Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentHistory" ADD CONSTRAINT "DocumentHistory_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "public"."Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentHistory" ADD CONSTRAINT "DocumentHistory_fromOfficeId_fkey" FOREIGN KEY ("fromOfficeId") REFERENCES "public"."Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentHistory" ADD CONSTRAINT "DocumentHistory_toOfficeId_fkey" FOREIGN KEY ("toOfficeId") REFERENCES "public"."Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentHistory" ADD CONSTRAINT "DocumentHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
