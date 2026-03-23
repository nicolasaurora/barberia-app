/*
  Warnings:

  - You are about to drop the column `sucursalId` on the `servicio` table. All the data in the column will be lost.
  - Added the required column `sucursalId` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `servicio` DROP FOREIGN KEY `Servicio_sucursalId_fkey`;

-- DropIndex
DROP INDEX `Servicio_sucursalId_fkey` ON `servicio`;

-- AlterTable
ALTER TABLE `registro` ADD COLUMN `sucursalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `servicio` DROP COLUMN `sucursalId`;

-- AddForeignKey
ALTER TABLE `Registro` ADD CONSTRAINT `Registro_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
