-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: bibliotheque
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Livre`
--

DROP TABLE IF EXISTS `Livre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Livre` (
  `idLivre` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) DEFAULT NULL,
  `auteur` varchar(30) DEFAULT NULL,
  `annee` int DEFAULT NULL,
  `categorie` varchar(30) DEFAULT NULL,
  `resumeLivre` varchar(500) DEFAULT NULL,
  `etat` varchar(50) DEFAULT NULL,
  `capacite` int DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idLivre`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `Livre_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Livre`
--

LOCK TABLES `Livre` WRITE;
/*!40000 ALTER TABLE `Livre` DISABLE KEYS */;
/*!40000 ALTER TABLE `Livre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ordinateur`
--

DROP TABLE IF EXISTS `Ordinateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ordinateur` (
  `idOrdinateur` int NOT NULL AUTO_INCREMENT,
  `etat` varchar(50) DEFAULT NULL,
  `useDate` date DEFAULT NULL,
  `startHour` date DEFAULT NULL,
  `endHour` date DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idOrdinateur`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `Ordinateur_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ordinateur`
--

LOCK TABLES `Ordinateur` WRITE;
/*!40000 ALTER TABLE `Ordinateur` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ordinateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tablette`
--

DROP TABLE IF EXISTS `Tablette`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tablette` (
  `idTablette` int NOT NULL AUTO_INCREMENT,
  `etat` varchar(50) DEFAULT NULL,
  `useDate` date DEFAULT NULL,
  `startHour` date DEFAULT NULL,
  `endHour` date DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idTablette`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `Tablette_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tablette`
--

LOCK TABLES `Tablette` WRITE;
/*!40000 ALTER TABLE `Tablette` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tablette` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `idPlace` int NOT NULL AUTO_INCREMENT,
  `etat` varchar(50) DEFAULT NULL,
  `useDate` date DEFAULT NULL,
  `startHour` date DEFAULT NULL,
  `endHour` date DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idPlace`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `place_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salle`
--

DROP TABLE IF EXISTS `salle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salle` (
  `idSalle` int NOT NULL AUTO_INCREMENT,
  `etat` varchar(50) DEFAULT NULL,
  `capacite` int DEFAULT NULL,
  `useDate` date DEFAULT NULL,
  `startHour` date DEFAULT NULL,
  `endHour` date DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  PRIMARY KEY (`idSalle`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `salle_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salle`
--

LOCK TABLES `salle` WRITE;
/*!40000 ALTER TABLE `salle` DISABLE KEYS */;
/*!40000 ALTER TABLE `salle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `lname` varchar(50) DEFAULT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `points` int DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-24 17:40:22
