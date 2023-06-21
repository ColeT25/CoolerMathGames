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
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$390000$ToqcezZ0vTKnj20c1SIzbn$XUva6brmkOTxWnzjUaLmqsrxuLOzzNfLdMTKc9ZJJ0A=','2023-04-25 04:56:51.792666',1,'Admin','','','colethacker25@gmail.com',1,1,'2023-03-21 21:26:48.522541'),(2,'pbkdf2_sha256$390000$KnCm0dAp0pfg2wFxF3lvfR$AjeQ+SPGLrjkhev78EURo68kVpzc1DCWW0Cv8SDSH9s=','2023-05-11 23:10:39.438520',1,'ZASnow','Zach','Snow','zachary.snow@twc.com',1,1,'2023-03-22 16:40:25.000000'),(3,'pbkdf2_sha256$390000$Wcz32LjX8ZAXBemKikdNT8$bYJmoY8yWm6mmdeltJkwiIdmI5ELA2UMjpQ07jSBid4=',NULL,0,'tli150','Tony','Li','tli274@uky.edu',0,1,'2023-03-22 16:52:26.000000'),(4,'pbkdf2_sha256$390000$6dqQzUXKSOoxcuzkW5hvoH$aMiWnXcHvzR1iN/GjgV+lp78/2u2XtLe5gILRPktEnw=','2023-04-17 21:30:53.559888',0,'ColeT','','','',0,1,'2023-03-22 21:43:41.989108'),(5,'pbkdf2_sha256$390000$OYUBYxkbeW2lHEe19pPWCJ$VLNfCHuwv/xfHT4znGUMlyOa/45zMvcITJKMptB38RU=','2023-03-27 16:37:30.696819',0,'guest','','','',0,1,'2023-03-27 16:37:22.051592'),(6,'pbkdf2_sha256$390000$aBqNKxjwWszrwVH0jRJwlJ$HcCOIpIHG0gV09V/ypbennpmZfjr9kDnuv5Uya8F3Jg=','2023-04-29 22:29:16.679957',0,'kevin','','','',0,1,'2023-04-09 01:16:08.333054'),(7,'pbkdf2_sha256$390000$r5iXJoAfA4Ax0tn4dh5uwT$6clSLm14HgxT4Gq/afSY+It7vcjg+AOQeA7pkXXRBug=','2023-04-18 01:06:29.464585',0,'Sword','','','',0,1,'2023-04-12 23:12:49.698307'),(8,'pbkdf2_sha256$390000$tnxHiRbHpSofQDPMvOtXkE$gTScyEMRREjl/cfargAs3uKkXgPOGSaygatHF32/TxY=','2023-04-14 16:20:46.057611',0,'Tony150','','','',0,1,'2023-04-14 16:20:29.454714'),(9,'pbkdf2_sha256$390000$vt2OwDKXW9Gct9NX8gvwPM$O0kp8rmJzIwZHY34XFU/23G++x/IWSMVi/zS0HUadP8=','2023-04-19 02:40:56.413283',0,'xXpoon-slayer-66642069Xx','','','',0,1,'2023-04-19 02:40:15.102287'),(10,'pbkdf2_sha256$390000$6EsRj6RwLe5cPBWKv3dStV$nLkUPe9khZLxCDPta0kSu8ktVrr90xYs3vFtl/hOaoc=','2023-04-25 22:44:18.499147',0,'Jesse_Iz_Cool','','','',0,1,'2023-04-19 21:27:33.429959');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
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

-- Dump completed on 2023-06-07 19:03:22
