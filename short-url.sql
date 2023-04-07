CREATE DATABASE url;
USE url;

CREATE TABLE `company` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` nvarchar(16),
  `level` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `provider` varchar(16) NOT NULL,
  `name` nvarchar(16),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `roles` (
  `comapny_id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_role` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `urls` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `short_url` varchar(16) UNIQUE NOT NULL,
  `long_url` varchar(255) NOT NULL,
  `picture` varchar(255),
  `title` nvarchar(32),
  `description` nvarchar(32),
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `clicks` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `urls_id` bigint NOT NULL,
  `time_range` timestamp,
  `referrer` varchar(16),
  `device` varchar(16),
  `regin` varchar(16),
  `count` int
);

ALTER TABLE `roles` ADD FOREIGN KEY (`comapny_id`) REFERENCES `company` (`id`);

ALTER TABLE `roles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `urls` ADD FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

ALTER TABLE `clicks` ADD FOREIGN KEY (`urls_id`) REFERENCES `urls` (`id`);
