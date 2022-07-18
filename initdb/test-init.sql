CREATE TABLE user_list (
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    PRIMARY KEY(username)
);

INSERT INTO user_list VALUES ('test', '123456', 'test123123@test.com');