-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2016 at 12:58 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `j3safetysolutions`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(200) NOT NULL,
  `user_id` int(50) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `user_id`, `date_added`) VALUES
(1, 'Construction Project Management', 1, '2016-03-09 18:02:26'),
(3, 'Entrepreneurial Development', 1, '2016-03-09 19:17:04'),
(4, 'Occupational Safety and Health', 1, '2016-03-09 19:27:58'),
(5, 'Food Safety', 1, '2016-03-09 19:29:42'),
(6, 'Construction-Related Skills', 1, '2016-03-09 19:33:52'),
(7, 'Human Resource Management', 1, '2016-03-09 19:34:18'),
(8, 'Quality Management', 1, '2016-03-09 19:40:47');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `course_code` varchar(30) NOT NULL,
  `course_name` varchar(200) DEFAULT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `uid`, `category_id`, `course_code`, `course_name`, `date_added`) VALUES
(2, 1, 1, '123-abc-def', 'Construction Project Management Course', '2016-03-10 14:06:32'),
(3, 1, 8, 'kldjs-43k3-43', 'Quality Management Course', '2016-03-10 14:07:00'),
(4, 1, 5, '1223234sddf', 'Food safety course', '2016-03-10 16:06:03');

-- --------------------------------------------------------

--
-- Table structure for table `delegates`
--

CREATE TABLE `delegates` (
  `delegate_id` int(11) NOT NULL,
  `training_id` int(11) DEFAULT NULL,
  `registration_id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `company_position` varchar(50) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `address` varchar(200) NOT NULL,
  `industry` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delegates`
--

INSERT INTO `delegates` (`delegate_id`, `training_id`, `registration_id`, `firstname`, `middlename`, `lastname`, `email`, `phone`, `company`, `company_position`, `image`, `address`, `industry`, `gender`) VALUES
(1, 3, 7, 'dfsfs', 'jkj', 'k', NULL, '15241', 'sdds', 'dsa', 'http://localhost/j3safetysolutions/uploads/delegates/', 'k', 'da', 'Male'),
(2, 3, 8, 'wdwqdwd', 'ujijuikj', 'jhkihjk', 'hjhydjdh@gmail.com', '565456', ';d;likp', 'huii', 'http://localhost/j3safetysolutions/uploads/delegates/22.png', 'oiooi', 'siuhihi', 'Male'),
(3, 5, 9, 'test', 'test', 'test', NULL, '4454554', 'test', 'test', 'http://localhost/j3safetysolutions/uploads/delegates/', 'test', 'test', 'Male'),
(4, 4, 10, 'pp', 'ppp', 'ppp', NULL, '123456', 'ppp', 'pppp', 'http://localhost/j3safetysolutions/uploads/delegates/', 'ppp', 'pppp', 'Male'),
(5, 4, 11, 'ooo', 'ooo', 'oo', NULL, '77878', 'ooo', 'oo', 'http://localhost/j3safetysolutions/uploads/delegates/8868.png', 'oo', 'oo', 'Male'),
(6, 5, 12, 'lll', 'll', 'l', NULL, '142', 'lll', 'llll', 'http://localhost/j3safetysolutions/uploads/delegates/^DC7AAECCD6C9BCA1A6F2FC60BFA9DE58AB1083DB0B490D839D^pimgpsh_fullsize_distr.jpg', 'lll', 'lll', 'Male'),
(7, 6, 13, 'mm', 'mm', 'mm', NULL, '124', 'mm', 'mm', 'http://localhost/j3safetysolutions/uploads/delegates/Paige.jpg', 'mm', 'mm', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `delegate_accounts`
--

CREATE TABLE `delegate_accounts` (
  `account_id` int(11) NOT NULL,
  `delegate_id` int(11) DEFAULT NULL,
  `amount_paid` double DEFAULT NULL,
  `or_no` varchar(30) DEFAULT NULL,
  `date_paid` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delegate_accounts`
--

INSERT INTO `delegate_accounts` (`account_id`, `delegate_id`, `amount_paid`, `or_no`, `date_paid`) VALUES
(1, 1, NULL, '123456', '2016-03-10 15:08:22'),
(2, 2, NULL, '123456', '2016-03-10 15:21:43'),
(3, 3, NULL, '123456', '2016-03-10 15:47:37'),
(4, 4, NULL, '123456', '2016-03-10 15:55:32'),
(5, 5, NULL, '123456', '2016-03-10 15:56:46'),
(6, 6, NULL, '123456', '2016-03-10 16:00:20'),
(7, 7, NULL, '123456', '2016-03-10 16:08:29');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `registration_id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `date_registered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`registration_id`, `userid`, `date_registered`) VALUES
(7, 1, '2016-03-10 15:08:22'),
(8, 1, '2016-03-10 15:21:43'),
(9, 1, '2016-03-10 15:47:37'),
(10, 1, '2016-03-10 15:55:32'),
(11, 1, '2016-03-10 15:56:46'),
(12, 1, '2016-03-10 16:00:20'),
(13, 1, '2016-03-10 16:08:29');

-- --------------------------------------------------------

--
-- Table structure for table `speakers`
--

CREATE TABLE `speakers` (
  `speaker_id` int(11) NOT NULL,
  `training_id` int(11) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `company_position` varchar(200) DEFAULT NULL,
  `image` blob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trainings`
--

CREATE TABLE `trainings` (
  `training_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `course_id` int(11) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `time_start` varchar(20) NOT NULL,
  `time_end` varchar(20) NOT NULL,
  `regular_fee` double NOT NULL,
  `discounted_fee` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trainings`
--

INSERT INTO `trainings` (`training_id`, `uid`, `date_added`, `course_id`, `location`, `from_date`, `to_date`, `time_start`, `time_end`, `regular_fee`, `discounted_fee`) VALUES
(3, 1, '2016-03-10 14:07:42', 2, '2nd floor, Butuan City', '2016-03-10', '2016-03-10', 'Thu Mar 10 2016 08:0', 'Thu Mar 10 2016 17:0', 2500, 2000),
(4, 1, '2016-03-10 14:09:45', 3, 'MSU Iligan, Iligan City', '2016-03-10', '2016-03-10', 'Thu Mar 10 2016 08:0', 'Thu Mar 10 2016 17:0', 3500, 3000),
(5, 1, '2016-03-10 15:44:03', 3, 'Cagayan de Oro City', '2016-03-10', '2016-03-10', 'Thu Mar 10 2016 08:0', 'Thu Mar 10 2016 17:0', 2500, 2000),
(6, 1, '2016-03-10 16:06:48', 4, 'Naawan, Misamis Oriental', '2016-03-17', '2016-03-19', 'Thu Mar 10 2016 08:0', 'Thu Mar 10 2016 17:0', 5000, 25000);

-- --------------------------------------------------------

--
-- Table structure for table `training_expenses`
--

CREATE TABLE `training_expenses` (
  `expense_id` int(11) NOT NULL,
  `training_id` int(11) NOT NULL,
  `expense_name` varchar(100) NOT NULL,
  `amount_paid` double NOT NULL,
  `or_no` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `training_signatories`
--

CREATE TABLE `training_signatories` (
  `sign_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `position` varchar(100) NOT NULL,
  `accredition_no` varchar(30) NOT NULL,
  `training_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `image` text,
  `user_type` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `firstname`, `middlename`, `lastname`, `image`, `user_type`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Ej', 'Govino', 'Lungay', 'http://localhost/j3safetysolutions/uploads/avatar3.jpg', 'admin'),
(2, 'test', '098f6bcd4621d373cade4e832627b4f6', 'test', 'test', 'test', 'http://localhost/j3safetysolutions/uploads/12743566_786394354826198_6208093201374157098_n.jpg', 'standard-user'),
(3, NULL, 'd41d8cd98f00b204e9800998ecf8427e', NULL, NULL, NULL, '0', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `fk_course_to_user_id_idx` (`uid`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `delegates`
--
ALTER TABLE `delegates`
  ADD PRIMARY KEY (`delegate_id`),
  ADD KEY `fk_delegate_training_id_idx` (`training_id`),
  ADD KEY `registration_id` (`registration_id`);

--
-- Indexes for table `delegate_accounts`
--
ALTER TABLE `delegate_accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `delegate_id` (`delegate_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`speaker_id`),
  ADD KEY `fk_speaker_training_id_idx` (`training_id`);

--
-- Indexes for table `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`training_id`),
  ADD KEY `fk_trainings_course_id_idx` (`course_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `training_expenses`
--
ALTER TABLE `training_expenses`
  ADD PRIMARY KEY (`expense_id`),
  ADD UNIQUE KEY `training_id` (`training_id`);

--
-- Indexes for table `training_signatories`
--
ALTER TABLE `training_signatories`
  ADD PRIMARY KEY (`sign_id`),
  ADD KEY `training_id` (`training_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `delegates`
--
ALTER TABLE `delegates`
  MODIFY `delegate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `delegate_accounts`
--
ALTER TABLE `delegate_accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `speakers`
--
ALTER TABLE `speakers`
  MODIFY `speaker_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trainings`
--
ALTER TABLE `trainings`
  MODIFY `training_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `training_expenses`
--
ALTER TABLE `training_expenses`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `training_signatories`
--
ALTER TABLE `training_signatories`
  MODIFY `sign_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `fk_course_to_user_id` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `delegates`
--
ALTER TABLE `delegates`
  ADD CONSTRAINT `delegates_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`),
  ADD CONSTRAINT `fk_delegate_training_id` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`);

--
-- Constraints for table `delegate_accounts`
--
ALTER TABLE `delegate_accounts`
  ADD CONSTRAINT `delegate_id_to_delegates_table` FOREIGN KEY (`delegate_id`) REFERENCES `delegates` (`delegate_id`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `speakers`
--
ALTER TABLE `speakers`
  ADD CONSTRAINT `fk_speaker_training_id` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`);

--
-- Constraints for table `trainings`
--
ALTER TABLE `trainings`
  ADD CONSTRAINT `fk_trainings_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `trainings_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `training_expenses`
--
ALTER TABLE `training_expenses`
  ADD CONSTRAINT `training_id_to_training_table` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`);

--
-- Constraints for table `training_signatories`
--
ALTER TABLE `training_signatories`
  ADD CONSTRAINT `training_signatories_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
