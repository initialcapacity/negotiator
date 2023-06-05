drop database if exists negotiator_development;
drop user if exists negotiator;

create user negotiator with encrypted password 'negotiator';
create database negotiator_development;
grant all privileges on database negotiator_development to negotiator;
