-- =========================
-- Crear base de datos
-- =========================
CREATE DATABASE IF NOT EXISTS file_app
  CHARACTER SET utf8mb4
  COLLATE 	utf8mb4_general_ci;

USE file_app;

-- =========================
-- Tabla users
-- =========================
CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- Tabla files
-- =========================
CREATE TABLE files (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       filename VARCHAR(255) NOT NULL,
                       size BIGINT NOT NULL,
                       content LONGBLOB NOT NULL,
                       user_id INT NOT NULL,
                       created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

                       CONSTRAINT fk_files_user
                           FOREIGN KEY (user_id)
                               REFERENCES users(id)
                               ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- Índices útiles
-- =========================
CREATE INDEX idx_files_user_id ON files(user_id);


-- =========================
-- Tabla files
-- =========================
INSERT INTO users (name, email, password)
VALUES (
           'Admin',
           'admin@test.com',
           '$2b$10$VlimXAeMMLI8Srw7v/wwzudKXNRjx7VFwZ3gUxt3lMPEOu80a4Y4e'
       );