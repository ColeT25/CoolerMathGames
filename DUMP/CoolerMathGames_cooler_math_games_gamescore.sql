-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: cooler-math-games.cctffrsopstu.us-east-2.rds.amazonaws.com    Database: CoolerMathGames
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `cooler_math_games_gamescore`
--

DROP TABLE IF EXISTS `cooler_math_games_gamescore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cooler_math_games_gamescore` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `date_obtained` date NOT NULL,
  `game_id` bigint NOT NULL,
  `user` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cooler_math_games_ga_game_id_84487bbd_fk_cooler_ma` (`game_id`),
  CONSTRAINT `cooler_math_games_ga_game_id_84487bbd_fk_cooler_ma` FOREIGN KEY (`game_id`) REFERENCES `cooler_math_games_game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cooler_math_games_gamescore`
--

LOCK TABLES `cooler_math_games_gamescore` WRITE;
/*!40000 ALTER TABLE `cooler_math_games_gamescore` DISABLE KEYS */;
INSERT INTO `cooler_math_games_gamescore` VALUES (14,264,'2023-04-03',5,'Admin'),(15,50,'2023-04-03',7,'Admin'),(17,1,'2023-04-03',6,'Admin'),(18,200,'2023-04-03',4,'Admin'),(19,1,'2023-04-04',6,'guest'),(20,3468,'2023-04-04',5,'ColeT'),(21,44,'2023-04-04',7,'ColeT'),(23,4,'2023-04-05',5,'ZASnow'),(24,53,'2023-04-05',7,'ZASnow'),(26,3024,'2023-04-05',5,'ZASnow'),(27,5,'2023-04-05',6,'ZASnow'),(28,49,'2023-04-05',7,'ZASnow'),(31,15240,'2023-04-07',5,'ZASnow'),(32,11,'2023-04-09',7,'kevin'),(33,10,'2023-04-09',7,'kevin'),(34,9,'2023-04-09',7,'kevin'),(35,11,'2023-04-09',7,'kevin'),(36,380,'2023-04-09',4,'kevin'),(37,11,'2023-04-09',7,'kevin'),(38,42,'2023-04-10',7,'guest'),(39,37,'2023-04-10',7,'guest'),(40,17352,'2023-04-12',5,'ZASnow'),(41,25484,'2023-04-12',5,'ZASnow'),(42,660,'2023-04-12',4,'ZASnow'),(43,48,'2023-04-12',7,'Admin'),(44,1000000000,'2023-04-12',7,'In honor of Kevin'),(45,39,'2023-04-12',7,'Admin'),(46,250,'2023-04-12',3,'Admin'),(47,6,'2023-04-12',6,'Sword'),(48,36,'2023-04-12',7,'Sword'),(49,38,'2023-04-12',7,'Sword'),(50,43,'2023-04-12',7,'Sword'),(51,34,'2023-04-17',7,'ColeT'),(52,2040,'2023-04-17',5,'ColeT'),(53,234,'2023-04-17',3,'ColeT'),(54,248,'2023-04-18',3,'ZASnow'),(55,4,'2023-04-18',8,'ColeT'),(56,230,'2023-04-18',4,'ColeT'),(57,10,'2023-04-18',6,'ColeT'),(58,10,'2023-04-18',8,'ColeT'),(59,6,'2023-04-18',8,'ColeT'),(60,227,'2023-04-18',3,'ColeT'),(61,6620,'2023-04-18',5,'ColeT'),(62,2,'2023-04-18',8,'ZASnow'),(63,39,'2023-04-19',7,'xXpoon-slayer-666420'),(64,7,'2023-04-19',8,'ColeT'),(65,12,'2023-04-19',8,'ColeT'),(66,50,'2023-04-19',7,'ColeT'),(67,248,'2023-04-19',3,'ColeT'),(68,3480,'2023-04-19',5,'Admin'),(69,2388,'2023-04-19',5,'guest'),(70,1648,'2023-04-19',5,'Jesse_Iz_Cool'),(71,2368,'2023-04-19',5,'Jesse_Iz_Cool'),(72,3596,'2023-04-19',5,'Jesse_Iz_Cool'),(73,43,'2023-04-19',7,'ZASnow'),(74,44,'2023-04-19',7,'ZASnow'),(75,0,'2023-04-20',6,'Jesse_Iz_Cool'),(76,1,'2023-04-20',6,'Jesse_Iz_Cool'),(77,5600,'2023-04-21',5,'Admin'),(78,2432,'2023-04-21',5,'Jesse_Iz_Cool'),(79,6796,'2023-04-21',5,'Jesse_Iz_Cool'),(80,7452,'2023-04-21',5,'Jesse_Iz_Cool'),(81,6996,'2023-04-21',5,'Jesse_Iz_Cool'),(82,0,'2023-04-23',9,'ZASnow'),(83,100,'2023-04-23',9,'ZASnow'),(84,12364,'2023-04-23',5,'Jesse_Iz_Cool'),(85,7,'2023-04-23',8,'Jesse_Iz_Cool'),(86,6252,'2023-04-23',5,'ZASnow'),(87,16464,'2023-04-24',5,'Admin'),(88,12,'2023-04-24',8,'Admin'),(89,15483,'2023-04-24',10,'Admin'),(90,10787,'2023-04-24',10,'Admin'),(91,18141,'2023-04-24',10,'Admin'),(92,520,'2023-04-25',4,'Admin'),(93,30,'2023-04-25',11,'Admin'),(94,1210,'2023-04-25',11,'Admin'),(95,190,'2023-04-25',11,'Admin'),(96,1080,'2023-04-25',11,'Admin'),(97,1480,'2023-04-25',11,'Admin'),(98,10229,'2023-04-25',10,'ZASnow'),(99,970,'2023-04-25',11,'ZASnow'),(100,80,'2023-04-25',11,'Tony150'),(101,390,'2023-04-25',11,'Admin'),(102,1720,'2023-04-25',11,'Admin'),(103,1380,'2023-04-25',11,'Jesse_Iz_Cool'),(104,13,'2023-04-25',10,'Jesse_Iz_Cool'),(105,1800,'2023-04-25',11,'Jesse_Iz_Cool'),(106,720,'2023-04-26',11,'Jesse_Iz_Cool'),(107,1300,'2023-04-26',11,'Jesse_Iz_Cool'),(108,1500,'2023-04-26',11,'Jesse_Iz_Cool'),(109,41247,'2023-04-26',10,'ZASnow'),(110,20,'2023-04-26',8,'ZASnow'),(111,1350,'2023-04-26',11,'ZASnow'),(112,80,'2023-04-26',11,'ZASnow'),(113,100,'2023-04-26',9,'ZASnow'),(114,1690,'2023-04-26',11,'ZASnow'),(115,32124,'2023-04-26',5,'ZASnow'),(116,1633,'2023-04-26',10,'ColeT'),(117,140,'2023-04-26',11,'ColeT'),(118,890,'2023-04-26',11,'ColeT'),(119,5,'2023-04-26',8,'ColeT'),(120,93,'2023-04-26',9,'Jesse_Iz_Cool'),(121,5141,'2023-04-26',10,'Jesse_Iz_Cool'),(122,420,'2023-04-26',11,'ColeT'),(123,5696,'2023-04-26',10,'Jesse_Iz_Cool'),(124,100,'2023-04-26',9,'ZASnow'),(125,100,'2023-04-26',9,'ColeT'),(126,100,'2023-04-26',9,'ColeT'),(127,54,'2023-04-26',7,'ZASnow'),(128,1060,'2023-04-26',11,'Jesse_Iz_Cool'),(129,670,'2023-04-26',4,'Jesse_Iz_Cool'),(130,100,'2023-04-26',9,'ZASnow'),(131,1480,'2023-04-26',11,'ZASnow'),(132,1370,'2023-04-26',11,'Jesse_Iz_Cool'),(133,43,'2023-04-27',7,'Jesse_Iz_Cool'),(134,1690,'2023-04-27',11,'Jesse_Iz_Cool'),(135,1860,'2023-04-27',11,'Jesse_Iz_Cool'),(136,1640,'2023-04-28',11,'Jesse_Iz_Cool'),(137,26,'2023-04-29',7,'kevin'),(138,1670,'2023-05-03',11,'guest'),(139,680,'2023-05-05',4,'guest'),(140,10988,'2023-05-14',5,'guest');
/*!40000 ALTER TABLE `cooler_math_games_gamescore` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-07 19:03:26
