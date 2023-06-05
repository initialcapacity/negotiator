drop database if exists negotiator_test;
drop database if exists negotiator_development;
drop user if exists negotiator;

create user negotiator with encrypted password 'negotiator';
create database negotiator_development;
create database negotiator_test;
grant all privileges on database negotiator_development to negotiator;
grant all privileges on database negotiator_test to negotiator;
