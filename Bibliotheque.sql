DROP DATABASE IF EXISTS Bibliotheque;
CREATE DATABASE Bibliotheque;
USE Bibliotheque;

DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Salle;
DROP TABLE IF EXISTS Place;
DROP TABLE IF EXISTS Livre;
DROP TABLE IF EXISTS Ordinateur;
DROP TABLE IF EXISTS Tablette;

CREATE TABLE Utilisateur (
    idUtilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    mdp VARCHAR(50),
    age INT,
    dateNaissance DATE,
    sexe VARCHAR(10),
    photo VARCHAR(100),
    type VARCHAR(50),
    points INT
);

CREATE TABLE Salle (
    idSalle INT AUTO_INCREMENT PRIMARY KEY,
    etat VARCHAR(50),
    capacite INT,
    dateUtilisation DATE,
	heureUtilisation HOUR,
	heureFinUtilisation HOUR,    idUtilisateur INT, -- Ajout de cette colonne pour la clé étrangère
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Place (
    idPlace INT AUTO_INCREMENT PRIMARY KEY,
    etat VARCHAR(50),
    dateUtilisation DATE,
	heureUtilisation HOUR,
	heureFinUtilisation HOUR,    idUtilisateur INT, -- Ajout de cette colonne pour la clé étrangère
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Livre (
    idLivre INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30),
    auteur VARCHAR(30),
    annee INT,  -- Suppression de l'accent
    categorie VARCHAR(30),  -- Suppression de l'accent
    resumeLivre VARCHAR(500),
    etat VARCHAR(50),
    capacite INT,
    dateUtilisation DATE,
	heureUtilisation HOUR,
	heureFinUtilisation HOUR,    idUtilisateur INT, -- Ajout de cette colonne pour la clé étrangère
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Ordinateur (
    idOrdinateur INT AUTO_INCREMENT PRIMARY KEY,
    etat VARCHAR(50),
    dateUtilisation DATE,
	heureUtilisation HOUR,
	heureFinUtilisation HOUR,
    idUtilisateur INT, -- Ajout de cette colonne pour la clé étrangère
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Tablette (
    idTablette INT AUTO_INCREMENT PRIMARY KEY,
    etat VARCHAR(50),
    dateAjout DATE,
    idUtilisateur INT, -- Ajout de cette colonne pour la clé étrangère
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);
