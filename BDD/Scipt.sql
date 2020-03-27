
SET NAMES utf8;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS coach;
DROP TABLE IF EXISTS appartenance;
DROP TABLE IF EXISTS invitation;
DROP TABLE IF EXISTS evenement;
DROP TABLE IF EXISTS equipe;
DROP TABLE IF EXISTS sport;
DROP TABLE IF EXISTS personne;

-- Définition des tables avec les clef primaire et ajouts des données de test -- 

create table personne (
    id int(32) primary key auto_increment,
    mail varchar
(255) not null,
    pass varchar
(255) not null,
    prenom varchar
(50) default null,
    nom varchar
(50) default null
);

lock tables personne write;
insert into personne
values
    (1, 'raimbaultfantin94@gmail.com', '$2b$16$6SxwCF.D9tTmorzst3y.beqA3a6I0cgEjd.UbNg0vjnNqyeh4O0WG', 'Fantin', 'Raimbault'),
    (2, 'faresamiar1@gmail.com', '$2b$16$6SxwCF.D9tTmorzst3y.beqA3a6I0cgEjd.UbNg0vjnNqyeh4O0WG', 'Fares', 'Amiar'),
    (3, 'rabyanisrabia@gmail.com', '$2b$16$6SxwCF.D9tTmorzst3y.beqA3a6I0cgEjd.UbNg0vjnNqyeh4O0WG', 'Yanis', 'Rabia'),
    (4, 'maziarzoliwier93@gmail.com', '$2b$16$6SxwCF.D9tTmorzst3y.beqA3a6I0cgEjd.UbNg0vjnNqyeh4O0WG', 'Oliwier', 'Maziarz'),
    (5, 'pedron.benjamin@gmail.com', '$2b$16$6SxwCF.D9tTmorzst3y.beqA3a6I0cgEjd.UbNg0vjnNqyeh4O0WG', 'Benjamin', 'Pedron'),
    (6, 'amraoui.many@gmail.com', '$2b$16$6SxwCF.D9tTmorzst3y.beqA3a6I0cgEjd.UbNg0vjnNqyeh4O0WG', 'Mariam', 'Amraoui');
unlock tables;

create table sport (
    id int(32) primary key auto_increment,
    nom varchar
(50) not null
);

lock tables sport write;
insert into sport
values
    (1, 'Football'),
    (2, 'Handball');
unlock tables;

create table equipe (
    id int(32) primary key auto_increment,
    nom_equipe varchar
(50) not null,
    id_sport int
(32) not null,
    unique
(nom_equipe, id_sport)
);

lock tables equipe write;
insert into equipe
values
    (1, 'PSG', 1),
    (2, 'PSG', 2);
unlock tables;

create table invitation
(
    id_equipe int(32) not null,
    id_personne int(32) not null,
    unique(id_equipe, id_personne)
);

lock table invitation write;
insert into invitation
values
    (1, 3),
    (2 , 6);
unlock tables;

create table appartenance
(
    id_equipe int(32) not null,
    id_personne int(32) not null,
    unique(id_equipe, id_personne)
);

lock table appartenance write;
insert into appartenance
values
    (1, 2),
    (2, 5);
unlock tables;

create table coach
(
    id_equipe int(32) not null,
    id_personne int(32) not null,
    unique(id_equipe, id_personne)
);

lock table coach write;
insert into coach
values
    (1, 1),
    (2, 4);
unlock tables;

create table message
(
    id_equipe int(32) not null,
    id_personne int(32) not null,
    temporalite datetime not null,
    texte text(21844) not null
);

lock table message write;
insert into message
values
    (1, 1, '2020-01-01 00:00:01', 'PUTAIN DE MERDE'),
    (1, 1, '2020-04-04 00:00:20', 'J4AI AJOUTE MON TETON GAUCHE SUR MON CAPTEUR DIGITALE'),
    (1, 1, '2020-04-04 00:00:52', 'ET CA FONCTIONNE'),
    (2, 5, '2020-01-01 00:00:01', 'Bonne année les freros'),
    (2, 4, '2020-04-04 12:12:12', 'Ok ..');
unlock tables;

create table evenement
(
    id_equipe int(32) not null,
    id_personne int(32) not null,
    temporalite_debut datetime not null,
    temporalite_fin datetime not null,
    texte varchar(30) default null
);

lock table evenement write;
insert into evenement
values
    (1, 1, '2020-01-01 00:00:01', '2020-01-01 00:00:02', 'Ceci est une seconde'),
    (1, 1, '2020-01-01 00:01:00', '2020-01-01 00:02:00', 'Ceci est une minute'),
    (1, 1, '2020-01-01 01:00:00', '2020-01-01 02:00:00', 'Ceci est une heure'),
    (1, 1, '2020-01-01 02:00:01', '2020-01-01 03:30:01', 'Ceci est une heure et demie');
unlock tables;

-- Définition des clefs secondaires --

alter table invitation 
    add constraint fk_invitation_equipe 
        foreign key (id_equipe) references equipe(id);

alter table invitation
    add constraint fk_invitation_personne
        foreign key (id_personne) references personne(id);

alter table appartenance
    add constraint fk_appartenance_equipe
        foreign key (id_equipe) references equipe(id);

alter table appartenance
    add constraint fk_appartenance_personne
        foreign key (id_personne) references personne(id);

alter table equipe
    add constraint fk_equipe_sport
        foreign key (id_sport) references sport(id);

alter table coach 
    add constraint fk_coach_equipe 
        foreign key (id_equipe) references equipe(id);

alter table coach
    add constraint fk_coach_personne
        foreign key (id_personne) references personne(id);

-- Création des vues --

CREATE OR REPLACE VIEW vue_personne
AS
SELECT
    id,
    mail,
    prenom,
    nom
FROM
    personne;


CREATE OR REPLACE VIEW vue_equipe_coach
AS
SELECT
    e.id as id_equipe,
    e.nom_equipe as nom_equipe,
    p.id as id_coach,
    p.mail as mail_coach,
    p.prenom as prenom_coach,
    p.nom as nom_coach
FROM
    personne as p,
    equipe as e
    INNER JOIN
    id 
WHERE
    ;
