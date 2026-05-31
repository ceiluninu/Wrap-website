ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'USER';

-- Seed an admin user (Password is 'admin123' BCrypt hashed)
-- Use a known hash for demo: $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOn2
INSERT INTO users (email, password, first_name, last_name, role)
VALUES ('admin@wrapbrand.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOn2', 'Admin', 'User', 'ADMIN');
