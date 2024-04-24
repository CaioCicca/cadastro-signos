CREATE TABLE cadastros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    aniversario VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INT NOT NULL, 
    signo VARCHAR(100) NOT NULL
);