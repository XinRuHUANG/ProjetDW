-- Uniformiser le nommage (toutes les tables au pluriel)
DROP TABLE IF EXISTS `books`, `computers`, `tablets`, `seats`, `rooms`, `users`, `favorites`;

-- Normaliser les catégories de livres dans une table séparée
CREATE TABLE `book_categories` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Ajouter une table pour les types d'utilisateurs
CREATE TABLE `user_types` (
  `idUserType` INT NOT NULL AUTO_INCREMENT,
  `typeName` VARCHAR(20) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `maxBorrowLimit` INT DEFAULT 5,
  PRIMARY KEY (`idUserType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `lastName` VARCHAR(50) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `age` INT CHECK (age >= 0),
  `birthDate` DATE DEFAULT NULL,
  `gender` ENUM('Male', 'Female', 'Other', 'Prefer not to say') DEFAULT NULL,
  `photoURL` VARCHAR(255) DEFAULT NULL,
  `idUserType` INT NOT NULL DEFAULT 1, -- Guest par défaut
  `points` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastLogin` DATETIME DEFAULT NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (`idUser`),
  FOREIGN KEY (`idUserType`) REFERENCES `user_types`(`idUserType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `books` (
  `idBook` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `isbn` VARCHAR(20) UNIQUE DEFAULT NULL,
  `yearPublished` YEAR DEFAULT NULL,
  `idCategory` INT DEFAULT NULL,
  `summary` TEXT DEFAULT NULL,
  `publisher` VARCHAR(100) DEFAULT NULL,
  `edition` VARCHAR(50) DEFAULT NULL,
  `language` VARCHAR(30) DEFAULT NULL,
  `pageCount` INT DEFAULT NULL,
  `stock` INT NOT NULL DEFAULT 1 CHECK (stock >= 0),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `coverImageURL` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`idBook`),
  FOREIGN KEY (`idCategory`) REFERENCES `book_categories`(`idCategory`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `borrow_records` (
  `idBorrow` INT NOT NULL AUTO_INCREMENT,
  `idBook` INT NOT NULL,
  `idUser` INT NOT NULL,
  `borrowDate` DATE NOT NULL,
  `dueDate` DATE NOT NULL,
  `returnDate` DATE DEFAULT NULL,
  `status` ENUM('Borrowed', 'Returned', 'Overdue', 'Lost') NOT NULL DEFAULT 'Borrowed',
  `fineAmount` DECIMAL(10,2) DEFAULT 0.00,
  `notes` TEXT DEFAULT NULL,
  PRIMARY KEY (`idBorrow`),
  FOREIGN KEY (`idBook`) REFERENCES `books`(`idBook`),
  FOREIGN KEY (`idUser`) REFERENCES `users`(`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reservations` (
  `idReservation` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `resourceType` ENUM('Book', 'Computer', 'Tablet', 'Seat', 'Room') NOT NULL,
  `resourceId` INT NOT NULL, -- ID de la ressource réservée
  `reservationDate` DATE NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  `status` ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') NOT NULL DEFAULT 'Pending',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idReservation`),
  FOREIGN KEY (`idUser`) REFERENCES `users`(`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `equipment` (
  `idEquipment` INT NOT NULL AUTO_INCREMENT,
  `equipmentType` ENUM('Computer', 'Tablet') NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `serialNumber` VARCHAR(50) UNIQUE,
  `purchaseDate` DATE DEFAULT NULL,
  `warrantyExpiry` DATE DEFAULT NULL,
  `status` ENUM('Available', 'In Use', 'Maintenance', 'Retired') NOT NULL DEFAULT 'Available',
  `lastMaintenanceDate` DATE DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  PRIMARY KEY (`idEquipment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `equipment_usage` (
  `idUsage` INT NOT NULL AUTO_INCREMENT,
  `idEquipment` INT NOT NULL,
  `idUser` INT NOT NULL,
  `startDateTime` DATETIME NOT NULL,
  `endDateTime` DATETIME DEFAULT NULL,
  `purpose` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`idUsage`),
  FOREIGN KEY (`idEquipment`) REFERENCES `equipment`(`idEquipment`),
  FOREIGN KEY (`idUser`) REFERENCES `users`(`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `seats` (
  `idSeat` INT NOT NULL AUTO_INCREMENT,
  `seatNumber` VARCHAR(10) NOT NULL,
  `zone` VARCHAR(50) NOT NULL,
  `features` SET('Power Outlet', 'Monitor', 'Standing Desk', 'Window View') DEFAULT NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (`idSeat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `rooms` (
  `idRoom` INT NOT NULL AUTO_INCREMENT,
  `roomName` VARCHAR(50) NOT NULL,
  `capacity` INT NOT NULL CHECK (capacity > 0),
  `features` SET('Projector', 'Whiteboard', 'Video Conference', 'Computers') DEFAULT NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (`idRoom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Historique des activités
CREATE TABLE `user_activities` (
  `idActivity` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `activityType` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `ipAddress` VARCHAR(45) DEFAULT NULL,
  `userAgent` TEXT DEFAULT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idActivity`),
  FOREIGN KEY (`idUser`) REFERENCES `users`(`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Notifications
CREATE TABLE `notifications` (
  `idNotification` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `type` ENUM('Info', 'Warning', 'Alert', 'Reminder') NOT NULL DEFAULT 'Info',
  `isRead` BOOLEAN DEFAULT FALSE,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `readAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idNotification`),
  FOREIGN KEY (`idUser`) REFERENCES `users`(`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Cache
CREATE TABLE `cache` (
  `key` VARCHAR(255)
  `value` VARCHAR(255)
  `expiration` DATETIME NOT NULL
)
