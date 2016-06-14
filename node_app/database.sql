CREATE USER 'bob'@'192.168.7.1' IDENTIFIED BY 'alice';

CREATE DATABASE votedb;

GRANT ALL PRIVILEGES ON votedb.* TO 'bob'@'192.168.7.1' WITH GRANT OPTION;

FLUSH PRIVILEGES;

USE votedb;
CREATE TABLE votes ( id INT NOT NULL AUTO_INCREMENT, date_added DATETIME, vote_value INT, PRIMARY KEY (id));
