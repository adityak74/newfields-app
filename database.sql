-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2019 at 09:22 PM
-- Server version: 5.5.62
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `fileKey` text,
  `formUID` text,
  `type` int(11) DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `fileKey`, `formUID`, `type`, `createdDate`) VALUES
(1, NULL, '83825d050d9c92675ba11d31ecdd1365', 4, '2019-04-28 19:14:54'),
(2, '1556479000208_15027625_1282230295170644_2173417474465571012_n.jpg', '83825d050d9c92675ba11d31ecdd1365', 1, '2019-04-28 19:14:55'),
(3, '1556479001712_44191124_2121578604560155_3288387202752446464_o.jpg', '83825d050d9c92675ba11d31ecdd1365', 2, '2019-04-28 19:14:55'),
(4, NULL, '83825d050d9c92675ba11d31ecdd1365', 3, '2019-04-28 19:14:55'),
(5, NULL, '0a25782a4781b5f94848424372f29382', 4, '2019-04-30 02:11:15'),
(6, NULL, '0a25782a4781b5f94848424372f29382', 1, '2019-04-30 02:11:15'),
(7, NULL, '0a25782a4781b5f94848424372f29382', 5, '2019-04-30 02:11:16'),
(8, '1556590379583_15027625_1282230295170644_2173417474465571012_n.jpg', '0a25782a4781b5f94848424372f29382', 6, '2019-04-30 02:11:16'),
(9, '1556656929333_Header.png', '8bcc587cc11f63ee841760e55ffc8e9b', 4, '2019-04-30 20:23:38'),
(10, '1556656931074_icon.png', '8bcc587cc11f63ee841760e55ffc8e9b', 1, '2019-04-30 20:23:38'),
(11, '1556656931837_NF.png', '8bcc587cc11f63ee841760e55ffc8e9b', 2, '2019-04-30 20:23:38'),
(12, '1556657001844_Picture1.png', '8bcc587cc11f63ee841760e55ffc8e9b', 3, '2019-04-30 20:23:38'),
(13, NULL, 'c23bff93858c43329dcaf2af075dfd87', 4, '2019-04-30 20:58:04'),
(14, '1556657883304_Header.png', 'c23bff93858c43329dcaf2af075dfd87', 1, '2019-04-30 20:58:04'),
(15, NULL, 'c23bff93858c43329dcaf2af075dfd87', 2, '2019-04-30 20:58:04'),
(16, NULL, 'c23bff93858c43329dcaf2af075dfd87', 3, '2019-04-30 20:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `documentType`
--

CREATE TABLE `documentType` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `documentType`
--

INSERT INTO `documentType` (`id`, `type`) VALUES
(1, 'PASSPORT_FRONT'),
(2, 'BIOMETRIC_RESIDENCE_PERMIT_FRONT'),
(3, 'BIOMETRIC_RESIDENCE_PERMIT_BACK'),
(4, 'PREVIOUS_UK_VISA'),
(5, 'PASSPORT_FRONT_TWO'),
(6, 'CURRENT_COUNTRY_RESIDENCE_PERMIT');

-- --------------------------------------------------------

--
-- Table structure for table `formData`
--

CREATE TABLE `formData` (
  `id` int(11) NOT NULL,
  `uniqueId` text NOT NULL,
  `title` text,
  `fullName` text,
  `mobile` text,
  `landline` text,
  `email` text,
  `addressLine1` text,
  `addressLine2` text,
  `town` text,
  `county` text,
  `postcode` text,
  `nationalities` text,
  `relationship` text,
  `otherNames` text,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formData`
--

INSERT INTO `formData` (`id`, `uniqueId`, `title`, `fullName`, `mobile`, `landline`, `email`, `addressLine1`, `addressLine2`, `town`, `county`, `postcode`, `nationalities`, `relationship`, `otherNames`, `createdDate`) VALUES
(1, 'e2154d952e275d01525d75bb4d5b0639', 'Mr', 'gagan', '1234567890', NULL, 'gagansingh2822@gmail.com', '277 albany road', 'dfs', 'cardiff', 'cardiff', 'cf24 3nx', 'UK', 'single', NULL, '2019-04-25 16:46:11'),
(2, 'c8abf11e2b116b76410d481c4913d859', 'Mr', 'gagan', '1234567678', '1123322323', '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-25 18:57:05'),
(3, '77cd9d999693088c802a032478f2894c', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '3146964520', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-27 18:35:23'),
(4, '1fe84a9879e07d90314102788f794f5b', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '3146964520', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-28 19:12:15'),
(5, '83825d050d9c92675ba11d31ecdd1365', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '3146964520', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-28 19:14:54'),
(6, '86712fb14f7efd03e9b3ef76aaea2662', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '2025550199', '1800555489', 'example@aa.com', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-30 01:52:14'),
(7, 'ab4e26776a461872dbf9f42f4b874a59', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '2025550199', '1800555489', '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-30 02:06:34'),
(8, 'ad31dbe58d9bea0192f162593ce936ba', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '2025550199', '1800555489', '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-30 02:08:53'),
(9, 'c82d625149651b3a9b0bd270e407f990', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '2025550199', '1800555489', '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-30 02:09:31'),
(10, '0a25782a4781b5f94848424372f29382', 'Mr', 'ADITYA KARNAM GURURAJ RAO', '2025550199', '1800555489', '', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '2019-04-30 02:11:14'),
(11, '8bcc587cc11f63ee841760e55ffc8e9b', 'Mr', 'GAGAN', '7440733880', NULL, 'gagansingh2822@gmail.com', '277 Albany road', NULL, 'Cardiff', 'Wales', 'Cf24 3NX', 'IN', 'single', NULL, '2019-04-30 20:23:38'),
(12, 'c23bff93858c43329dcaf2af075dfd87', 'Mr', 'GAGAN', '7440733880', NULL, 'gagansingh2822@gmail.com', '277 albany Road', NULL, 'Cardiff', 'Wales', 'CF24 3NX', 'IN, UK', 'single', NULL, '2019-04-30 20:58:03');

-- --------------------------------------------------------

--
-- Table structure for table `formDataExtraInfo`
--

CREATE TABLE `formDataExtraInfo` (
  `id` int(11) NOT NULL,
  `conviction` text,
  `convictionText` text,
  `visaRefusal` text,
  `visaRefusalText` text,
  `publicFunds` text,
  `ukNino` text,
  `nationalInsuranceNumber` text,
  `medical` text,
  `medicalText` text,
  `armedForces` text,
  `armedForcesText` text,
  `immediateFamily` text,
  `immediateFamilyText` text,
  `homeAddress` text,
  `moveInDate` text,
  `homeOwnership` text,
  `addressOnVisa` text,
  `nationalIdentityNumber` text,
  `ifUKaddress` text,
  `ukAddressInfo` text,
  `ukEntryDate` text,
  `ukNextDepartureDate` text,
  `ukNextArrivalDate` text,
  `ukProposedEntryDate` text,
  `familyMemberTravelAlong` text,
  `familyMemberTravelAlongText` text,
  `overseasTravel` text,
  `anyChildren` text,
  `partnerTitle` text,
  `partnerFullName` text,
  `partnerMobile` text,
  `partnerUKHomeAddress` text,
  `partnerNationalities` text,
  `partnerAlternateNationality` text,
  `partnerDateOfBirth` text,
  `partnerPlaceOfBirth` text,
  `anyVisits` text,
  `anyTrips` text,
  `anyOtherTrips` text,
  `formUniqueId` text NOT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formDataExtraInfo`
--

INSERT INTO `formDataExtraInfo` (`id`, `conviction`, `convictionText`, `visaRefusal`, `visaRefusalText`, `publicFunds`, `ukNino`, `nationalInsuranceNumber`, `medical`, `medicalText`, `armedForces`, `armedForcesText`, `immediateFamily`, `immediateFamilyText`, `homeAddress`, `moveInDate`, `homeOwnership`, `addressOnVisa`, `nationalIdentityNumber`, `ifUKaddress`, `ukAddressInfo`, `ukEntryDate`, `ukNextDepartureDate`, `ukNextArrivalDate`, `ukProposedEntryDate`, `familyMemberTravelAlong`, `familyMemberTravelAlongText`, `overseasTravel`, `anyChildren`, `partnerTitle`, `partnerFullName`, `partnerMobile`, `partnerUKHomeAddress`, `partnerNationalities`, `partnerAlternateNationality`, `partnerDateOfBirth`, `partnerPlaceOfBirth`, `anyVisits`, `anyTrips`, `anyOtherTrips`, `formUniqueId`, `createDate`) VALUES
(1, 'Yes', 'convictions', 'Yes', 'visa refusals', 'Income support', 'qwxzc122', 'qwxzc122', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-16 00:00:00.000', '2019-04-26 00:00:00.000', '2019-04-26 00:00:00.000', NULL, NULL, NULL, NULL, 'No', 'title', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 'e2154d952e275d01525d75bb4d5b0639', '2019-04-25 18:50:02'),
(2, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 'No', 'No', 'No', 'c8abf11e2b116b76410d481c4913d859', '2019-04-25 19:01:44'),
(3, 'undefined', '', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL, NULL, NULL, 'undefined', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '77cd9d999693088c802a032478f2894c', '2019-04-28 19:09:25'),
(4, 'undefined', '', 'undefined', '', 'select option', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL, NULL, NULL, 'undefined', 'title', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '1fe84a9879e07d90314102788f794f5b', '2019-04-28 19:12:15'),
(5, 'undefined', '', 'undefined', '', 'select option', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL, NULL, NULL, 'undefined', 'title', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '83825d050d9c92675ba11d31ecdd1365', '2019-04-28 19:17:12'),
(6, 'undefined', '', 'undefined', '', NULL, 'undefined', 'undefined', 'undefined', NULL, 'undefined', NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, '', '', '', NULL, 'undefined', NULL, NULL, 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'No', 'No', '86712fb14f7efd03e9b3ef76aaea2662', '2019-04-30 01:52:15'),
(7, 'undefined', '', 'undefined', '', NULL, 'undefined', 'undefined', 'undefined', NULL, 'undefined', NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, '', '', '', NULL, 'undefined', NULL, NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'No', 'No', 'ab4e26776a461872dbf9f42f4b874a59', '2019-04-30 02:06:34'),
(8, 'undefined', '', 'undefined', '', NULL, 'undefined', 'undefined', 'undefined', NULL, 'undefined', NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, '', '', '', NULL, 'undefined', NULL, NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'No', 'No', 'ad31dbe58d9bea0192f162593ce936ba', '2019-04-30 02:08:53'),
(9, 'undefined', '', 'undefined', '', NULL, 'undefined', 'undefined', 'undefined', NULL, 'undefined', NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, '', '', '', NULL, 'undefined', NULL, NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'No', 'No', 'c82d625149651b3a9b0bd270e407f990', '2019-04-30 02:09:32'),
(10, 'undefined', '', 'undefined', '', NULL, 'undefined', 'undefined', 'undefined', NULL, 'undefined', NULL, 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, '', '', '', NULL, 'undefined', NULL, NULL, 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'No', 'No', '0a25782a4781b5f94848424372f29382', '2019-04-30 02:13:28'),
(11, 'No', '', 'No', '', 'None of the below', 'QQ123456C', 'QQ123456C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '22/04/2019', '01/05/2019', '08/05/2019', NULL, NULL, NULL, NULL, 'No', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '8bcc587cc11f63ee841760e55ffc8e9b', '2019-04-30 20:42:00'),
(12, 'No', '', 'No', '', 'None of the below', 'QQ123456C', 'QQ123456C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23/04/2019', '01/05/2019', '08/05/2019', NULL, NULL, NULL, NULL, 'No', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 'c23bff93858c43329dcaf2af075dfd87', '2019-04-30 20:58:45');

-- --------------------------------------------------------

--
-- Table structure for table `formNumber`
--

CREATE TABLE `formNumber` (
  `id` int(11) NOT NULL,
  `number` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formNumber`
--

INSERT INTO `formNumber` (`id`, `number`) VALUES
(1, 'ONE'),
(2, 'TWO');

-- --------------------------------------------------------

--
-- Table structure for table `formProcessingStatus`
--

CREATE TABLE `formProcessingStatus` (
  `id` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formProcessingStatus`
--

INSERT INTO `formProcessingStatus` (`id`, `status`) VALUES
(1, 'SUBMITTED'),
(2, 'INPROGRESS'),
(3, 'PROCESSED');

-- --------------------------------------------------------

--
-- Table structure for table `formRelationships`
--

CREATE TABLE `formRelationships` (
  `id` int(11) NOT NULL,
  `formId` text NOT NULL,
  `relationshipId` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formRelationships`
--

INSERT INTO `formRelationships` (`id`, `formId`, `relationshipId`, `createdDate`) VALUES
(1, 'e2154d952e275d01525d75bb4d5b0639', 1, '2019-04-25 16:46:11'),
(2, 'e2154d952e275d01525d75bb4d5b0639', 2, '2019-04-25 16:46:11'),
(3, 'c8abf11e2b116b76410d481c4913d859', 3, '2019-04-25 18:57:06'),
(4, 'c8abf11e2b116b76410d481c4913d859', 4, '2019-04-25 18:57:06'),
(5, 'c8abf11e2b116b76410d481c4913d859', 5, '2019-04-25 18:57:06'),
(6, 'c8abf11e2b116b76410d481c4913d859', 6, '2019-04-25 18:57:06'),
(7, '77cd9d999693088c802a032478f2894c', 7, '2019-04-27 18:35:24'),
(8, '77cd9d999693088c802a032478f2894c', 8, '2019-04-27 18:35:24'),
(9, '1fe84a9879e07d90314102788f794f5b', 9, '2019-04-28 19:12:16'),
(10, '1fe84a9879e07d90314102788f794f5b', 10, '2019-04-28 19:12:16'),
(11, '83825d050d9c92675ba11d31ecdd1365', 11, '2019-04-28 19:14:55'),
(12, '83825d050d9c92675ba11d31ecdd1365', 12, '2019-04-28 19:14:55'),
(13, '0a25782a4781b5f94848424372f29382', 13, '2019-04-30 02:11:16'),
(14, '0a25782a4781b5f94848424372f29382', 14, '2019-04-30 02:11:16'),
(15, '0a25782a4781b5f94848424372f29382', 15, '2019-04-30 02:11:17'),
(16, '0a25782a4781b5f94848424372f29382', 16, '2019-04-30 02:11:17'),
(17, '8bcc587cc11f63ee841760e55ffc8e9b', 17, '2019-04-30 20:23:38'),
(18, '8bcc587cc11f63ee841760e55ffc8e9b', 18, '2019-04-30 20:23:38'),
(19, 'c23bff93858c43329dcaf2af075dfd87', 19, '2019-04-30 20:58:03'),
(20, 'c23bff93858c43329dcaf2af075dfd87', 20, '2019-04-30 20:58:03');

-- --------------------------------------------------------

--
-- Table structure for table `formStatus`
--

CREATE TABLE `formStatus` (
  `id` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formStatus`
--

INSERT INTO `formStatus` (`id`, `status`) VALUES
(1, 'NEW'),
(2, 'UPDATE'),
(3, 'SUBMIT');

-- --------------------------------------------------------

--
-- Table structure for table `formTrips`
--

CREATE TABLE `formTrips` (
  `id` int(11) NOT NULL,
  `formId` text NOT NULL,
  `tripId` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formTrips`
--

INSERT INTO `formTrips` (`id`, `formId`, `tripId`, `createdDate`) VALUES
(1, 'c8abf11e2b116b76410d481c4913d859', 1, '2019-04-25 18:57:06'),
(2, 'c8abf11e2b116b76410d481c4913d859', 2, '2019-04-25 18:57:06'),
(3, 'c8abf11e2b116b76410d481c4913d859', 3, '2019-04-25 18:57:06'),
(4, 'c8abf11e2b116b76410d481c4913d859', 4, '2019-04-25 18:57:06'),
(5, 'c8abf11e2b116b76410d481c4913d859', 5, '2019-04-25 18:57:06'),
(6, 'c8abf11e2b116b76410d481c4913d859', 6, '2019-04-25 18:57:06'),
(7, 'c8abf11e2b116b76410d481c4913d859', 7, '2019-04-25 18:57:06'),
(8, 'c8abf11e2b116b76410d481c4913d859', 8, '2019-04-25 18:57:06'),
(9, 'c8abf11e2b116b76410d481c4913d859', 9, '2019-04-25 18:57:06'),
(10, 'c8abf11e2b116b76410d481c4913d859', 10, '2019-04-25 18:57:06'),
(11, 'c8abf11e2b116b76410d481c4913d859', 11, '2019-04-25 18:57:06'),
(12, 'c8abf11e2b116b76410d481c4913d859', 12, '2019-04-25 18:57:06'),
(13, 'c8abf11e2b116b76410d481c4913d859', 13, '2019-04-25 18:57:06'),
(14, 'c8abf11e2b116b76410d481c4913d859', 14, '2019-04-25 18:57:06'),
(15, 'c8abf11e2b116b76410d481c4913d859', 15, '2019-04-25 18:57:06'),
(16, '0a25782a4781b5f94848424372f29382', 16, '2019-04-30 02:11:18'),
(17, '0a25782a4781b5f94848424372f29382', 17, '2019-04-30 02:11:18'),
(18, '0a25782a4781b5f94848424372f29382', 18, '2019-04-30 02:11:18'),
(19, '0a25782a4781b5f94848424372f29382', 19, '2019-04-30 02:11:18'),
(20, '0a25782a4781b5f94848424372f29382', 20, '2019-04-30 02:11:19'),
(21, '0a25782a4781b5f94848424372f29382', 21, '2019-04-30 02:11:19'),
(22, '0a25782a4781b5f94848424372f29382', 22, '2019-04-30 02:11:19'),
(23, '0a25782a4781b5f94848424372f29382', 23, '2019-04-30 02:11:19'),
(24, '0a25782a4781b5f94848424372f29382', 24, '2019-04-30 02:11:19'),
(25, '0a25782a4781b5f94848424372f29382', 25, '2019-04-30 02:11:19'),
(26, '0a25782a4781b5f94848424372f29382', 26, '2019-04-30 02:11:19'),
(27, '0a25782a4781b5f94848424372f29382', 27, '2019-04-30 02:11:19'),
(28, '0a25782a4781b5f94848424372f29382', 28, '2019-04-30 02:11:19'),
(29, '0a25782a4781b5f94848424372f29382', 29, '2019-04-30 02:11:20'),
(30, '0a25782a4781b5f94848424372f29382', 30, '2019-04-30 02:11:20');

-- --------------------------------------------------------

--
-- Table structure for table `relationshipInfo`
--

CREATE TABLE `relationshipInfo` (
  `id` int(11) NOT NULL,
  `firstName` text,
  `countryOfBirth` text,
  `nationality` text,
  `alternateNationality` text,
  `dateOfBirth` text,
  `relationType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `relationshipInfo`
--

INSERT INTO `relationshipInfo` (`id`, `firstName`, `countryOfBirth`, `nationality`, `alternateNationality`, `dateOfBirth`, `relationType`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, 4),
(2, NULL, NULL, NULL, NULL, NULL, 4),
(3, NULL, NULL, '', '', NULL, 4),
(4, NULL, NULL, '', '', NULL, 4),
(5, NULL, NULL, '', '', NULL, 2),
(6, '', '', '', '', '', 1),
(7, NULL, NULL, NULL, NULL, NULL, 4),
(8, NULL, NULL, NULL, NULL, NULL, 4),
(9, NULL, NULL, NULL, NULL, NULL, 4),
(10, NULL, NULL, NULL, NULL, NULL, 4),
(11, NULL, NULL, NULL, NULL, NULL, 4),
(12, NULL, NULL, NULL, NULL, NULL, 4),
(13, NULL, NULL, NULL, NULL, NULL, 4),
(14, NULL, NULL, NULL, NULL, NULL, 4),
(15, NULL, NULL, NULL, NULL, NULL, 2),
(16, '', '', '', '', '', 1),
(17, NULL, NULL, NULL, NULL, NULL, 4),
(18, NULL, NULL, NULL, NULL, NULL, 4),
(19, NULL, NULL, NULL, NULL, NULL, 4),
(20, NULL, NULL, NULL, NULL, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `relationTypes`
--

CREATE TABLE `relationTypes` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `relationTypes`
--

INSERT INTO `relationTypes` (`id`, `name`) VALUES
(1, 'MOTHER'),
(2, 'FATHER'),
(3, 'PARTNER'),
(4, 'CHILD');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `country` text,
  `arrivalDate` text,
  `departureDate` text,
  `reason` text,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `country`, `arrivalDate`, `departureDate`, `reason`, `type`) VALUES
(1, 'UK', '', '', '', 1),
(2, 'UK', '', '', '', 1),
(3, 'UK', '', '', '', 1),
(4, 'UK', '', '', '', 1),
(5, 'UK', '', '', '', 1),
(6, '', '', '', '', 2),
(7, '', '', '', '', 2),
(8, '', '', '', '', 2),
(9, '', '', '', '', 2),
(10, '', '', '', '', 2),
(11, '', '', '', '', 3),
(12, '', '', '', '', 3),
(13, '', '', '', '', 3),
(14, '', '', '', '', 3),
(15, '', '', '', '', 3),
(16, 'UK', '', '', '', 1),
(17, 'UK', '', '', '', 1),
(18, 'UK', '', '', '', 1),
(19, 'UK', '', '', '', 1),
(20, 'UK', '', '', '', 1),
(21, '', '', '', '', 2),
(22, '', '', '', '', 2),
(23, '', '', '', '', 2),
(24, '', '', '', '', 2),
(25, '', '', '', '', 2),
(26, '', '', '', '', 3),
(27, '', '', '', '', 3),
(28, '', '', '', '', 3),
(29, '', '', '', '', 3),
(30, '', '', '', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tripTypes`
--

CREATE TABLE `tripTypes` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tripTypes`
--

INSERT INTO `tripTypes` (`id`, `name`) VALUES
(1, 'VISIT'),
(2, 'NORMAL_TRIP'),
(3, 'OTHER_TRIP');

-- --------------------------------------------------------

--
-- Table structure for table `userForms`
--

CREATE TABLE `userForms` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `formUID` varchar(32) NOT NULL,
  `formNumber` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `processingStatus` int(11) NOT NULL DEFAULT '0',
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userForms`
--

INSERT INTO `userForms` (`id`, `userId`, `formUID`, `formNumber`, `status`, `processingStatus`, `createDate`, `updateDate`) VALUES
(1, 16, 'e2154d952e275d01525d75bb4d5b0639', 1, 3, 1, '2019-04-25 16:46:11', '2019-04-25 18:50:28'),
(2, 16, 'c8abf11e2b116b76410d481c4913d859', 2, 2, 1, '2019-04-25 18:57:05', '2019-04-25 19:02:10'),
(3, 16, '77cd9d999693088c802a032478f2894c', 1, 2, 1, '2019-04-27 18:35:23', '2019-04-28 19:09:24'),
(4, 16, '1fe84a9879e07d90314102788f794f5b', 1, 1, 1, '2019-04-28 19:12:15', NULL),
(5, 16, '83825d050d9c92675ba11d31ecdd1365', 1, 2, 1, '2019-04-28 19:14:53', '2019-04-28 19:17:11'),
(6, 16, '86712fb14f7efd03e9b3ef76aaea2662', 2, 1, 1, '2019-04-30 01:52:14', NULL),
(7, 16, 'ab4e26776a461872dbf9f42f4b874a59', 2, 1, 1, '2019-04-30 02:06:34', NULL),
(8, 16, 'ad31dbe58d9bea0192f162593ce936ba', 2, 1, 1, '2019-04-30 02:08:52', NULL),
(9, 16, 'c82d625149651b3a9b0bd270e407f990', 2, 1, 1, '2019-04-30 02:09:31', NULL),
(10, 16, '0a25782a4781b5f94848424372f29382', 2, 2, 1, '2019-04-30 02:11:14', '2019-04-30 02:13:28'),
(14, 16, '8bcc587cc11f63ee841760e55ffc8e9b', 1, 2, 1, '2019-04-30 20:23:37', '2019-04-30 20:42:09'),
(15, 16, 'c23bff93858c43329dcaf2af075dfd87', 1, 2, 1, '2019-04-30 20:58:03', '2019-04-30 20:58:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `token` text NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `isVerified`, `admin`, `token`, `createdDate`) VALUES
(13, 'aditya', 'akarnam@atomic47.com', '$2a$10$VX81V9TSlHjNP.yJFC1BHOckzaZxTriOuFXk1dM4yeV/4R4.C3iYi', 1, 0, '972967842ca4eaf93d4d6b6bf249e562', '2019-03-18 23:59:59'),
(14, 'Aditya Karnam', 'akarnam37@gmail.com', '$2a$10$YDaF7nctVL3UQb6ZERwD4uVqTZ2liVmu00AcKJmCRlqrtHuUg5szy', 1, 0, 'b6855867f2f073bed58864dc606f1342', '2019-03-19 07:06:42'),
(15, 'GAGAN', 'GAGANSINGH2822@GMAIL.COM', '$2a$10$oK/GznJmEQYH8YBNTGY30OsG4IvFAUjjCsWs2IrWYZx/UREinq2OC', 1, 1, '58a586d87df8f215ba001705126a55ad', '2019-03-19 18:27:38'),
(16, 'Jhonny Doe', 'user@user.com', '$2a$10$xNfG9MWk5xn51jrAakt/pusK9i2Cz24mBUZYlQ9Bp6.ABAGfefwDC', 1, 0, 'f4cadc0048825b6629ae9ae1cd82bdb5', '2019-03-19 20:04:57'),
(17, 'admin', 'admin@admin.com', '$2a$10$naxxi/nx7EJv74QXtASB9uqyv9hloS4j1TTa.L7G6VQLqsLA1wt.O', 1, 1, '836d0d07420d71c3b51be7d98180ea6a', '2019-03-21 05:35:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documentType`
--
ALTER TABLE `documentType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formData`
--
ALTER TABLE `formData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formDataExtraInfo`
--
ALTER TABLE `formDataExtraInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formNumber`
--
ALTER TABLE `formNumber`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formProcessingStatus`
--
ALTER TABLE `formProcessingStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formRelationships`
--
ALTER TABLE `formRelationships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formStatus`
--
ALTER TABLE `formStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formTrips`
--
ALTER TABLE `formTrips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relationshipInfo`
--
ALTER TABLE `relationshipInfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationType` (`relationType`);

--
-- Indexes for table `relationTypes`
--
ALTER TABLE `relationTypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `tripTypes`
--
ALTER TABLE `tripTypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userForms`
--
ALTER TABLE `userForms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `documentType`
--
ALTER TABLE `documentType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `formData`
--
ALTER TABLE `formData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `formDataExtraInfo`
--
ALTER TABLE `formDataExtraInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `formNumber`
--
ALTER TABLE `formNumber`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `formProcessingStatus`
--
ALTER TABLE `formProcessingStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `formRelationships`
--
ALTER TABLE `formRelationships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `formStatus`
--
ALTER TABLE `formStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `formTrips`
--
ALTER TABLE `formTrips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `relationshipInfo`
--
ALTER TABLE `relationshipInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `relationTypes`
--
ALTER TABLE `relationTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tripTypes`
--
ALTER TABLE `tripTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userForms`
--
ALTER TABLE `userForms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `relationshipInfo`
--
ALTER TABLE `relationshipInfo`
  ADD CONSTRAINT `relationshipInfo_ibfk_1` FOREIGN KEY (`relationType`) REFERENCES `relationTypes` (`id`);

--
-- Constraints for table `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`type`) REFERENCES `tripTypes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
