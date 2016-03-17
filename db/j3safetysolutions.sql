-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2016 at 02:47 AM
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
(1, 'BOSH', 1, '2016-03-14 14:52:11'),
(2, 'CBAA', 1, '2016-03-16 18:22:58');

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
(1, 1, 1, 'wewe', 'dsd', '2016-03-14 14:52:19'),
(2, 1, 1, 'fdfd', 'tae baho', '2016-03-14 14:59:22'),
(3, 1, 2, 'q22342sd-dsdsd', 'BSBA', '2016-03-16 18:24:13');

-- --------------------------------------------------------

--
-- Table structure for table `delegates`
--

CREATE TABLE `delegates` (
  `delegate_id` int(11) NOT NULL,
  `delegate_number` int(11) NOT NULL,
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

INSERT INTO `delegates` (`delegate_id`, `delegate_number`, `registration_id`, `firstname`, `middlename`, `lastname`, `email`, `phone`, `company`, `company_position`, `image`, `address`, `industry`, `gender`) VALUES
(1, 1345, 1, 'iro ka', 'iro', 'iro', 'iro@iro.com', '123456', 'iro', 'iro', 'uploads/delegates/^DC7AAECCD6C9BCA1A6F2FC60BFA9DE58AB1083DB0B490D839D^pimgpsh_fullsize_distr3.jpg', 'iro', 'iro', 'Male'),
(2, 0, 2, 'jj', 'jj', 'jj', 'kjdsljd', '564', 'fsfhkj', 'jkldfsj', 'uploads/delegates/221.png', 'jj', 'hkjs', 'Male'),
(3, 0, 3, 'kk', 'kkk', 'kk', 'kkk', '4568', 'kkk', 'kkk', 'uploads/delegates/3557-illustration-of-a-black-circular-arrow-pv.png', 'kk', 'kkk', 'Male'),
(4, 0, 4, 'll', 'll', 'll', 'll', '4587', 'll', 'll', 'uploads/delegates/88681.png', 'll', 'll', 'Male'),
(5, 0, 5, 'oo', 'oo', 'oo', 'oo', '786766', 'oo', 'oo', 'uploads/delegates/178271.png', 'oo', 'oo', 'Female'),
(6, 0, 6, 'pp', 'pp', 'pp', 'pp', '78687', 'pp', 'pp', 'uploads/delegates/39642.png', 'pp', 'pp', 'Female'),
(7, 0, 7, 'qtweyq', 'ociso', 'juoli', 'jluidoj', '457865', 'oiufdo', 'fsoiy', 'uploads/delegates/bank.JPG', 'jlk', 'ofeio', 'Female'),
(8, 0, 8, 'yewu', 'dsj', 'dhsgu', 'dsjh', '675', 'fdiufi', 'sfuhyu', 'uploads/delegates/basic-shield-1-md.png', 'djskdj', 'fsjjyh', 'Female'),
(9, 0, 9, 'm', 'mm', 'm', 'mm', NULL, 'mm', 'mm', 'uploads/delegates/green-simple-shield-hi.png', 'm', 'mm', 'Male'),
(10, 0, 10, 'fname', 'jdfslkj', 'iui', 'dsoiudo', '45746', 'idfosidfo', 'sdpoifop', 'uploads/delegates/Gear_icon.svg.png', 'dsjhk', 'udfoio', 'Female'),
(11, 0, 11, 'opop', 'opopsy', 'gygs', 'ufsiuf9i', '456768', 'iufweoiu', 'feiu', 'uploads/delegates/pie-chart-1.png', 'jdfsij', 'odio', 'Female'),
(12, 0, 12, 'ty', 'tyt', 'y', 'yuyu', '665', 'hg', 'ds', 'uploads/delegates/icon_1690.png', 'ytu', 'shuih', 'Male'),
(13, 0, 13, 'dsd', 'dhgjhg', 'jhgdhs', 'dsd', '788', 'dsd', 'dasd', 'uploads/delegates/we1.jpg', 'dsjh', 'dsd', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `delegate_accounts`
--

CREATE TABLE `delegate_accounts` (
  `account_id` int(11) NOT NULL,
  `delegate_id` int(11) DEFAULT NULL,
  `amount_paid` double DEFAULT NULL,
  `or_no` varchar(30) DEFAULT NULL,
  `date_paid` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `training_attended_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delegate_accounts`
--

INSERT INTO `delegate_accounts` (`account_id`, `delegate_id`, `amount_paid`, `or_no`, `date_paid`, `training_attended_id`) VALUES
(1, 1, 5000, '123456', '2016-03-14 14:56:33', 1),
(2, 2, 4455, '123456', '2016-03-14 15:33:26', 3),
(3, 3, 875, '123456', '2016-03-14 15:33:51', 4),
(4, 4, 787, '123456', '2016-03-14 15:34:16', 5),
(5, 5, 7874, '123456', '2016-03-14 15:34:49', 6),
(6, 6, 75, '123456', '2016-03-14 15:35:32', 7),
(7, 7, 598, '123456', '2016-03-14 15:35:52', 8),
(8, 8, 7687, '123456', '2016-03-14 15:36:12', 9),
(9, 9, 79877, '123456', '2016-03-14 17:06:08', 10),
(10, 10, 8543, '123456', '2016-03-14 17:09:24', 11),
(11, 11, 543, '123456', '2016-03-14 17:10:17', 12),
(12, 12, 77, '123456', '2016-03-14 17:16:56', 13),
(13, 13, 87, '123456', '2016-03-14 17:17:35', 14);

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
(1, 1, '2016-03-14 14:56:33'),
(2, 1, '2016-03-14 15:33:26'),
(3, 1, '2016-03-14 15:33:51'),
(4, 1, '2016-03-14 15:34:16'),
(5, 1, '2016-03-14 15:34:49'),
(6, 1, '2016-03-14 15:35:32'),
(7, 1, '2016-03-14 15:35:52'),
(8, 1, '2016-03-14 15:36:12'),
(9, 1, '2016-03-14 17:06:08'),
(10, 1, '2016-03-14 17:09:24'),
(11, 1, '2016-03-14 17:10:17'),
(12, 1, '2016-03-14 17:16:56'),
(13, 1, '2016-03-14 17:17:35');

-- --------------------------------------------------------

--
-- Table structure for table `signatories`
--

CREATE TABLE `signatories` (
  `signatory_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signatories`
--

INSERT INTO `signatories` (`signatory_id`, `uid`, `date_created`) VALUES
(1, 1, '2016-03-15 04:13:41');

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
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `company_position` varchar(50) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `speakers`
--

INSERT INTO `speakers` (`speaker_id`, `training_id`, `firstname`, `middlename`, `lastname`, `email`, `phone`, `company`, `company_position`, `image`, `date_added`) VALUES
(1, 3, 'ako', 'ako', 'ako', 'ak', '2365', 'ako', 'CEO', 'uploads/speakers/^DC7AAECCD6C9BCA1A6F2FC60BFA9DE58AB1083DB0B490D839D^pimgpsh_fullsize_distr1.jpg', '2016-03-15 12:13:20');

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
  `discounted_fee` double NOT NULL,
  `remarks` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trainings`
--

INSERT INTO `trainings` (`training_id`, `uid`, `date_added`, `course_id`, `location`, `from_date`, `to_date`, `time_start`, `time_end`, `regular_fee`, `discounted_fee`, `remarks`) VALUES
(1, 1, '2016-03-14 14:52:41', 1, 'dsds', '2016-03-14', '2016-03-14', 'Mon Mar 14 2016 08:0', 'Mon Mar 14 2016 16:5', 4344, 123, 'ako si bofody => userid:1'),
(3, 1, '2016-03-14 15:01:29', 2, 'amb ot', '2016-03-14', '2016-03-14', 'Mon Mar 14 2016 08:0', 'Mon Mar 14 2016 17:0', 43434, 2423, ''),
(4, 1, '2016-03-16 18:24:43', 3, 'Naaan, m,is. or', '2016-03-16', '2016-03-16', 'Wed Mar 16 2016 08:0', 'Wed Mar 16 2016 17:0', 5000, 2200, '');

-- --------------------------------------------------------

--
-- Table structure for table `training_attended`
--

CREATE TABLE `training_attended` (
  `ta_id` int(11) NOT NULL,
  `delegate_id` int(11) NOT NULL,
  `training_id` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `training_attended`
--

INSERT INTO `training_attended` (`ta_id`, `delegate_id`, `training_id`, `date_added`) VALUES
(1, 1, 1, '2016-03-14 06:56:33'),
(2, 1, 3, '2016-03-14 07:01:40'),
(3, 2, 3, '2016-03-14 07:33:26'),
(4, 3, 3, '2016-03-14 07:33:51'),
(5, 4, 3, '2016-03-14 07:34:16'),
(6, 5, 3, '2016-03-14 07:34:49'),
(7, 6, 3, '2016-03-14 07:35:32'),
(8, 7, 3, '2016-03-14 07:35:52'),
(9, 8, 3, '2016-03-14 07:36:12'),
(10, 9, 3, '2016-03-14 09:06:08'),
(11, 10, 3, '2016-03-14 09:09:24'),
(12, 11, 3, '2016-03-14 09:10:17'),
(13, 12, 3, '2016-03-14 09:16:56'),
(14, 13, 3, '2016-03-14 09:17:35'),
(15, 5, 1, '2016-03-15 09:02:36'),
(16, 9, 1, '2016-03-16 08:13:35'),
(17, 8, 1, '2016-03-16 09:58:08'),
(18, 6, 1, '2016-03-16 10:13:49'),
(19, 13, 1, '2016-03-16 10:14:27'),
(20, 8, 4, '2016-03-16 10:36:24'),
(21, 4, 4, '2016-03-16 10:36:38'),
(22, 9, 4, '2016-03-16 10:36:40'),
(23, 4, 1, '2016-03-16 10:37:01');

-- --------------------------------------------------------

--
-- Table structure for table `training_expenses`
--

CREATE TABLE `training_expenses` (
  `expense_id` int(11) NOT NULL,
  `training_id` int(11) NOT NULL,
  `expense_name` varchar(100) NOT NULL,
  `amount_paid` double NOT NULL,
  `or_no` varchar(30) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `training_expenses`
--

INSERT INTO `training_expenses` (`expense_id`, `training_id`, `expense_name`, `amount_paid`, `or_no`, `date_time`) VALUES
(9, 3, 'tesat', 44, '2323', '2016-03-15 09:46:08'),
(10, 3, 'snack', 1345, '43434', '2016-03-15 09:46:16'),
(11, 3, 'snack again', 1351, '3342', '2016-03-15 09:48:46'),
(12, 3, 'snacj', 500, '1344', '2016-03-15 09:50:03');

-- --------------------------------------------------------

--
-- Table structure for table `training_signatories`
--

CREATE TABLE `training_signatories` (
  `sign_id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `position` varchar(100) NOT NULL,
  `accredition_no` varchar(30) NOT NULL,
  `training_id` int(11) NOT NULL,
  `signatory_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `training_signatories`
--

INSERT INTO `training_signatories` (`sign_id`, `firstname`, `middlename`, `lastname`, `position`, `accredition_no`, `training_id`, `signatory_id`) VALUES
(1, 'ikaw', 'ikaw', 'ikaw', 'CEO', '1325435', 3, 1);

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
  `user_type` varchar(30) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(15) NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `firstname`, `middlename`, `lastname`, `image`, `user_type`, `date_created`, `status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Ej mo', 'Govino', 'Lungay', 'uploads/users/we1.jpg', 'Super Admin', '2016-03-15 15:37:43', 'ACTIVE'),
(2, 'test', '098f6bcd4621d373cade4e832627b4f6', 'test', 'test', 'test', 'uploads/12743566_786394354826198_6208093201374157098_n.jpg', 'Standard User', '2016-03-15 15:37:43', 'INACTIVE'),
(3, 'ejlungay', 'd41d8cd98f00b204e9800998ecf8427e', 'EJ', 'G', 'Lungay', NULL, 'Standard User', '2016-03-15 16:29:39', 'ACTIVE'),
(4, 'username', '5f4dcc3b5aa765d61d8327deb882cf99', 'firstname', 'middlename', 'lastname', NULL, 'Super Admin', '2016-03-15 16:32:54', 'INACTIVE'),
(5, 'lllll', 'd41d8cd98f00b204e9800998ecf8427e', 'llll', 'llll', 'llll', NULL, 'Admin', '2016-03-15 16:33:29', 'ACTIVE'),
(6, 'oooo', 'd41d8cd98f00b204e9800998ecf8427e', 'ooooo', 'ooooo', 'ooooo', NULL, 'Standard User', '2016-03-15 16:35:12', 'ACTIVE'),
(7, 'qwerty', 'd41d8cd98f00b204e9800998ecf8427e', 'ooooo', 'ooooo', 'ooooo', NULL, 'Standard User', '2016-03-15 16:38:13', 'ACTIVE'),
(9, 'superadmin', '17c4520f6cfd1ab53d8745e84681eb49', 'superadmin', 'superadmin', 'superadmin', NULL, 'Super Admin', '2016-03-15 17:40:41', 'ACTIVE'),
(11, 'username1', '5f4dcc3b5aa765d61d8327deb882cf99', 'firstname', 'middlename', 'lastname', 'uploads/users/w2.png', 'Super Admin', '2016-03-16 09:47:07', 'ACTIVE'),
(12, 'standard', 'd41d8cd98f00b204e9800998ecf8427e', 'standard', 'standard', 'standard', 'uploads/users/di9rRRGjT.png', 'Standard User', '2016-03-16 09:51:34', 'ACTIVE');

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
  ADD KEY `registration_id` (`registration_id`);

--
-- Indexes for table `delegate_accounts`
--
ALTER TABLE `delegate_accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `delegate_id` (`delegate_id`),
  ADD KEY `training_attended_id` (`training_attended_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `signatories`
--
ALTER TABLE `signatories`
  ADD PRIMARY KEY (`signatory_id`),
  ADD KEY `uid` (`uid`);

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
-- Indexes for table `training_attended`
--
ALTER TABLE `training_attended`
  ADD PRIMARY KEY (`ta_id`),
  ADD KEY `delegate_id` (`delegate_id`),
  ADD KEY `training_id` (`training_id`);

--
-- Indexes for table `training_expenses`
--
ALTER TABLE `training_expenses`
  ADD PRIMARY KEY (`expense_id`),
  ADD KEY `training_id` (`training_id`);

--
-- Indexes for table `training_signatories`
--
ALTER TABLE `training_signatories`
  ADD PRIMARY KEY (`sign_id`),
  ADD KEY `training_id` (`training_id`),
  ADD KEY `signatory_id` (`signatory_id`);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `delegates`
--
ALTER TABLE `delegates`
  MODIFY `delegate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `delegate_accounts`
--
ALTER TABLE `delegate_accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `signatories`
--
ALTER TABLE `signatories`
  MODIFY `signatory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `speakers`
--
ALTER TABLE `speakers`
  MODIFY `speaker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `trainings`
--
ALTER TABLE `trainings`
  MODIFY `training_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `training_attended`
--
ALTER TABLE `training_attended`
  MODIFY `ta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `training_expenses`
--
ALTER TABLE `training_expenses`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `training_signatories`
--
ALTER TABLE `training_signatories`
  MODIFY `sign_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
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
  ADD CONSTRAINT `delegates_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`);

--
-- Constraints for table `delegate_accounts`
--
ALTER TABLE `delegate_accounts`
  ADD CONSTRAINT `delegate_accounts_ibfk_1` FOREIGN KEY (`training_attended_id`) REFERENCES `training_attended` (`ta_id`),
  ADD CONSTRAINT `delegate_id_to_delegates_table` FOREIGN KEY (`delegate_id`) REFERENCES `delegates` (`delegate_id`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `signatories`
--
ALTER TABLE `signatories`
  ADD CONSTRAINT `signatories_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

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
-- Constraints for table `training_attended`
--
ALTER TABLE `training_attended`
  ADD CONSTRAINT `training_attended_ibfk_1` FOREIGN KEY (`delegate_id`) REFERENCES `delegates` (`delegate_id`),
  ADD CONSTRAINT `training_attended_ibfk_2` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`);

--
-- Constraints for table `training_expenses`
--
ALTER TABLE `training_expenses`
  ADD CONSTRAINT `training_expenses_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `training_signatories`
--
ALTER TABLE `training_signatories`
  ADD CONSTRAINT `training_signatories_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`training_id`),
  ADD CONSTRAINT `training_signatories_ibfk_2` FOREIGN KEY (`signatory_id`) REFERENCES `signatories` (`signatory_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
