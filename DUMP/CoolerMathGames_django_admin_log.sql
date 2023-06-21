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
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-03-21 21:27:32.775028','1','avoid by Cole Thacker currently has 0 total plays',1,'[{\"added\": {}}]',7,1),(2,'2023-03-21 21:28:54.267761','1','Avoid by Cole Thacker currently has 0 total plays',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',7,1),(3,'2023-03-21 21:40:25.357238','1','Anon: ********',1,'[{\"added\": {}}]',8,1),(4,'2023-03-22 16:40:26.335657','2','ZASnow',1,'[{\"added\": {}}]',4,1),(5,'2023-03-22 16:40:55.325466','2','ZASnow',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email address\", \"Staff status\"]}}]',4,1),(6,'2023-03-22 16:41:50.756122','2','ZASnow',2,'[{\"changed\": {\"fields\": [\"Superuser status\"]}}]',4,1),(7,'2023-03-22 16:42:32.315068','2','ZASnow: ***********',1,'[{\"added\": {}}]',8,2),(8,'2023-03-22 16:52:26.860898','3','tli150',1,'[{\"added\": {}}]',4,1),(9,'2023-03-22 16:52:50.356628','3','tli150',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email address\"]}}]',4,1),(10,'2023-03-22 17:20:33.224485','2','Flappy by Zach Snow currently has 0 total plays',1,'[{\"added\": {}}]',7,2),(11,'2023-03-22 20:02:57.869570','3','Mines by Zach Snow currently has 0 total plays',1,'[{\"added\": {}}]',7,2),(12,'2023-03-24 15:43:08.948864','3','Mines by Zach Snow currently has 12 total plays',2,'[]',7,2),(13,'2023-03-24 16:33:30.692827','3','Mines by Zach Snow currently has 0 total plays',2,'[{\"changed\": {\"fields\": [\"Total plays\"]}}]',7,2),(14,'2023-03-24 16:50:04.745037','4','Phaser Test by jesse currently has 0 total plays',1,'[{\"added\": {}}]',7,1),(15,'2023-03-24 18:13:14.570598','4','PhaserTest by jesse currently has 0 total plays',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',7,1),(16,'2023-03-24 18:30:36.653534','5','2048 by Zach Snow currently has 0 total plays',1,'[{\"added\": {}}]',7,2),(17,'2023-03-28 01:27:12.389913','6','Hangman by Jesse Perkins currently has 0 total plays',1,'[{\"added\": {}}]',7,1),(18,'2023-03-28 01:41:17.651828','6','Hangman by Jesse Perkins currently has 0 total plays',2,'[]',7,1),(19,'2023-03-28 02:05:59.694357','6','Hangman by Jesse Perkins currently has 500 total plays',2,'[{\"changed\": {\"fields\": [\"Total plays\"]}}]',7,1),(20,'2023-03-28 11:48:48.980022','4','PhaserTest by jesse currently has 27 total plays',2,'[{\"changed\": {\"fields\": [\"Total plays\"]}}]',7,2),(21,'2023-03-28 17:22:07.251987','9','1 obtained a score of 100 in Avoid on 2023-03-26',3,'',9,1),(22,'2023-03-28 17:22:07.293800','8','1 obtained a score of 100 in Avoid on 2023-03-26',3,'',9,1),(23,'2023-03-28 17:22:07.338734','7','1 obtained a score of 100 in Avoid on 2023-03-26',3,'',9,1),(24,'2023-03-28 17:22:07.380519','6','1 obtained a score of 100 in Avoid on 2023-03-24',3,'',9,1),(25,'2023-03-28 17:22:07.449959','4','1 obtained a score of 100 in Avoid on 2023-03-22',3,'',9,1),(26,'2023-03-28 17:22:07.491631','1','1 obtained a score of 100 in Avoid on 2023-03-21',3,'',9,1),(27,'2023-03-31 15:57:45.887429','7','Catcher by Khumbo Phiri currently has 0 total plays',1,'[{\"added\": {}}]',7,2),(28,'2023-03-31 16:01:25.369431','7','Bug-Catcher by Khumbo Phiri currently has 1 total plays',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',7,2),(29,'2023-03-31 16:02:14.309508','7','Catcher by Khumbo Phiri currently has 1 total plays',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',7,2),(30,'2023-04-07 16:20:32.242232','1','Avoid by Cole Thacker currently has 44 total plays',3,'',7,1),(31,'2023-04-12 16:46:34.949514','2','Flappy by Zach Snow currently has 64 total plays',3,'',7,2),(32,'2023-04-12 21:30:40.039200','44','In honor of Kevin obtained a score of 1000000000 in Catcher on 2023-04-12',1,'[{\"added\": {}}]',9,1),(33,'2023-04-12 23:24:13.562434','47','Sword obtained a score of 6 in Hangman on 2023-04-12',1,'[{\"added\": {}}]',9,2),(34,'2023-04-18 01:15:18.999925','8','Tomato by Khumbo Phiri currently has 0 total plays',1,'[{\"added\": {}}]',7,2),(35,'2023-04-20 05:13:56.822315','6','Hangman by Jesse Perkins currently has 108 total plays',2,'[{\"changed\": {\"fields\": [\"Total plays\"]}}]',7,1),(36,'2023-04-22 21:56:05.606720','9','Sudoku by Zach Snow currently has 0 total plays',1,'[{\"added\": {}}]',7,2),(37,'2023-04-23 15:55:39.048676','29','guest obtained a score of 17660 in 2048 on 2023-04-06',3,'',9,2),(38,'2023-04-24 00:16:42.005830','10','2048 Fibonacci by Zach Snow & Jesse P. currently has 0 total plays',1,'[{\"added\": {}}]',7,1),(39,'2023-04-24 00:26:51.473035','10','2048Fibonacci by Zach Snow & Jesse P. currently has 0 total plays',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',7,1),(40,'2023-04-25 04:57:17.832441','11','Climber by Jesse Perkins currently has 0 total plays',1,'[{\"added\": {}}]',7,1),(41,'2023-04-25 04:57:38.026041','4','PhaserTest by Jesse Perkins currently has 89 total plays',2,'[{\"changed\": {\"fields\": [\"Author\"]}}]',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
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

-- Dump completed on 2023-06-07 19:03:23
