CREATE TABLE users
(
    user_id    BIGSERIAL NOT NULL PRIMARY KEY ,
    username   VARCHAR(255),
    password   VARCHAR(255),
    first_name VARCHAR(255),
    last_name  VARCHAR(255)
);

insert into users ("username", "password", "first_name", "last_name")
values ('Andrei', 'parola', 'Andrei','Marian')