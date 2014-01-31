-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 08, 2013 at 03:42 PM
-- Server version: 5.5.31
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `slot_game`
--
CREATE DATABASE IF NOT EXISTS `slot_game` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `slot_game`;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=79 ;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `text`) VALUES
(76, 'In the slot game rules are simple:\r\nYou win with 3 or more symbols of the same type in the middle row. The jackpot is 5 Cherries.'),
(77, 'Symbols ranking:\r\n1. Cherry \r\n2. Coin \r\n3. Apple \r\n4. Banana \r\n5. Bar \r\n6. 777 \r\n7. Diamond \r\n8. Strawberry \r\n9. Bell \r\n10. Grapes '),
(78, 'If you run out of chips you can reset it at any time in "My profile" menu.');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE IF NOT EXISTS `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `bet` int(11) NOT NULL,
  `win` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `chips` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `chips`) VALUES
(3, 'some', '246cc2705b609a62a71ed12509d1a80955757845', 1000),
(4, 'joro', '6156574b00c1d403b6cf2a715d06a1a34768b751', 581064),
(23, 'admin', '5ea44f06ab4324a06f9aa0613268bca0711aa448', 986347);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
