create database gubcpa;

use gubcpa;

drop database gubcpa;

select * from Students;

select * from Teachers;

select * from Admins;

select * from Marks;

drop table Marks;

SHOW CREATE TABLE Marks;

ALTER TABLE Marks MODIFY batch ENUM('Advanced', 'Intermediate', 'Beginner') NOT NULL;

select * from Attendances

drop table Attendances;
alter table Attendances


drop table Iupcs;



select * from Iupcs;

update Iupcs
set status="upcoming"
where id = 1;

SHOW INDEXES FROM Teams WHERE Non_unique = 0;


ALTER TABLE Teams
DROP INDEX iupcId;  


alter table TempStudents
add column address varchar(255)

select * from TempStudents;
