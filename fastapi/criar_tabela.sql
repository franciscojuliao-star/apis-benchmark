-- Cria o banco de dados (execute separadamente se necessário)
-- CREATE DATABASE projetos_db;

-- Conecte ao banco antes de rodar o restante:
-- \c projetos_db

-- Tipo ENUM para status
CREATE TYPE status_projeto AS ENUM ('ativo', 'finalizado');

-- Tabela projetos
CREATE TABLE projetos (
    id          SERIAL PRIMARY KEY,
    titulo      VARCHAR(255) NOT NULL,
    coordenador VARCHAR(255) NOT NULL,
    curso       VARCHAR(255) NOT NULL,
    ano         INTEGER      NOT NULL,
    status      status_projeto NOT NULL DEFAULT 'ativo'
);
