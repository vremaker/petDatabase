-- Valerie Remkaer
-- CSE154 AD
-- 11/29/18
-- CP5
--
-- Creates a sql database called the_remakers and a table called Pets which
-- stores information about pets that the remakers own/ have owned

DROP DATABASE IF EXISTS the_remakers;
CREATE DATABASE the_remakers;

USE the_remakers;

CREATE TABLE Pets (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  middle_name VARCHAR(255),
  last_name VARCHAR(255),
  birthday DATE,
  gender VARCHAR(255),
  species VARCHAR(255),
  PRIMARY KEY(id)
);

INSERT INTO Pets (name, middle_name, last_name, birthday, gender, species)
  VALUES("Sasha", "Victor", "Remaker", "2005/04/22", "Male", "cat"),
        ("Freda", "Eleanor", "Remaker", "1998/02/14", "Female", "dog"),
        ("Frisky", "Boris", "Remaker", "1991/08/25", "Male", "cat"),
        ("Biscuit", "Louise", "Remaker", "1993/01/02", "Female", "cat"),
        ("Sophie", "Buttercup", "Remaker", "1991/10/14", "Female" , "cat"),
        ("Wilbur", "Francis", "Remaker", "1998/09/22", "Male", "cat"),
        ("Whiskers", "Juliette", "Remaker", "2002/06/01", "Female", "cat");


SELECT name, middle_name, last_name, birthday, gender, species
FROM Pets ORDER BY name;
