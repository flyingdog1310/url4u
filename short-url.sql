CREATE DATABASE url;
USE url;


CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `provider` varchar(16) NOT NULL,
  `name` nvarchar(16),
  `email` varchar(255) NOT NULL,
  `role` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `access` (
  `host_id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_role` tinyint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `urls` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
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
  `count` int
);

CREATE TABLE `devices_count` (
  `click_id` int NOT NULL,
  `device` varchar(16),
  `count` int
);

CREATE TABLE `regions_count` (
  `click_id` int NOT NULL,
  `regin` varchar(16),
  `count` int
);

ALTER TABLE `access` ADD FOREIGN KEY (`host_id`) REFERENCES `users` (`id`);

ALTER TABLE `access` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `urls` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `clicks` ADD FOREIGN KEY (`urls_id`) REFERENCES `urls` (`id`);

ALTER TABLE `devices_count` ADD FOREIGN KEY (`click_id`) REFERENCES `clicks` (`id`);

ALTER TABLE `regions_count` ADD FOREIGN KEY (`click_id`) REFERENCES `clicks` (`id`);
