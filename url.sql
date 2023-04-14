-- MySQL dump 10.13  Distrib 8.0.32, for macos13 (x86_64)
--
-- Host: localhost    Database: url
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `click`
--

DROP TABLE IF EXISTS `click`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `click` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_id` bigint NOT NULL,
  `time_range` timestamp NULL DEFAULT NULL,
  `referrer` varchar(32) DEFAULT NULL,
  `device` varchar(16) DEFAULT NULL,
  `region` varchar(16) DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `url_id` (`url_id`),
  CONSTRAINT `click_ibfk_1` FOREIGN KEY (`url_id`) REFERENCES `url` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `click`
--

LOCK TABLES `click` WRITE;
/*!40000 ALTER TABLE `click` DISABLE KEYS */;
INSERT INTO `click` VALUES (1,2,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(2,2,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(3,2,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(4,3,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(5,3,'1995-01-01 00:00:00','https://l.facebook.com/','Macintosh','TPE/Taipei',1),(6,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(7,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(8,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(9,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(10,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(11,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(12,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(13,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(14,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(15,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(16,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(17,4,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(18,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(19,4,'1995-01-01 00:00:00','https://l.facebook.com/','Macintosh','TPE/Taipei',1),(20,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(21,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(22,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(23,4,'1995-01-01 00:00:00','native','iPhone','/',1),(24,4,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(25,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(26,4,'1995-01-01 00:00:00','native','Windows NT 10.0','TPE/Taipei',1),(27,4,'1995-01-01 00:00:00','http://m.facebook.com','iPhone','TPE/Taipei',1),(28,4,'1995-01-01 00:00:00','http://m.facebook.com','iPhone','TPE/Taipei',1),(29,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(30,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(31,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(32,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(33,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(34,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(35,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(36,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(37,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(38,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(39,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(40,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(41,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(42,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(43,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(44,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(45,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(46,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(47,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(48,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(49,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(50,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(51,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(52,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(53,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(54,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(55,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(56,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(57,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(58,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(59,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(60,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(61,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(62,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(63,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(64,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(65,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(66,4,'1995-01-01 00:00:00','native','Linux','/',1),(67,3,'1995-01-01 00:00:00','native','Linux','/',1),(68,4,'1995-01-01 00:00:00','native','Windows NT 10.0','/',1),(69,4,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(70,4,'1995-01-01 00:00:00','https://l.facebook.com/','Windows NT 10.0','WA/Pullman',1),(71,4,'1995-01-01 00:00:00','https://l.facebook.com/','Windows NT 10.0','WA/Pullman',1),(72,4,'1995-01-01 00:00:00','https://l.facebook.com/','Windows NT 10.0','WA/Pullman',1),(73,4,'1995-01-01 00:00:00','native','Macintosh','TPE/Taipei',1),(74,2,'1995-01-01 00:00:00','https://l.facebook.com/','Windows NT 10.0','WA/Pullman',1),(75,4,'1995-01-01 00:00:00','https://l.facebook.com/','Windows NT 10.0','WA/Pullman',1),(76,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(77,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1),(78,2,'1995-01-01 00:00:00','native','iPhone','TPE/Taipei',1);
/*!40000 ALTER TABLE `click` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `level` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'admin',0,'2023-04-08 10:07:16');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `company_id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_role` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `comapny_id` (`company_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,1,0,'2023-04-08 10:07:44');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url`
--

DROP TABLE IF EXISTS `url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `url` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `short_url` varchar(16) NOT NULL,
  `long_url` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `title` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `short_url` (`short_url`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `url_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url`
--

LOCK TABLES `url` WRITE;
/*!40000 ALTER TABLE `url` DISABLE KEYS */;
INSERT INTO `url` VALUES (1,1,'stylish','https://flyingdog.live/','1681130073410-972-logo.jpg','STYLiSH','buy your first spaceship now!!!','2023-04-10 12:34:33','2023-04-10 12:33:19'),(2,1,'google','https://google.com/','1681133550407-4229-google.jpg','google title','google it for you','2023-04-10 13:32:30','2023-04-10 13:18:43'),(3,1,'google1','https://google.com/','1681137215444-2737-google.jpg','google','123','2023-04-10 14:33:35','2023-04-10 14:27:57'),(4,1,'aws','https://aws.amazon.com/','1681179044752-6873-jeff-bezos.jpg','your ec2 is on','bezos is watching you','2023-04-11 02:10:45','2023-04-11 02:09:50');
/*!40000 ALTER TABLE `url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(16) NOT NULL,
  `name` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'native','admin','liudahsing84@gmail.com','1310admin','2023-04-08 10:06:03');
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

-- Dump completed on 2023-04-14 17:28:11
