-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 01, 2019 at 03:56 AM
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
  `formRefNumber` text,
  `formNumber` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `processingStatus` int(11) NOT NULL DEFAULT '0',
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `documentType`
--
ALTER TABLE `documentType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `formData`
--
ALTER TABLE `formData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `formDataExtraInfo`
--
ALTER TABLE `formDataExtraInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `formStatus`
--
ALTER TABLE `formStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `formTrips`
--
ALTER TABLE `formTrips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `relationshipInfo`
--
ALTER TABLE `relationshipInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `relationTypes`
--
ALTER TABLE `relationTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `tripTypes`
--
ALTER TABLE `tripTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userForms`
--
ALTER TABLE `userForms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
