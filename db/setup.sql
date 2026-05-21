CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- seed
INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Backend dev'),
('Carlos Ruiz', 'carlos@example.com', 'DB specialist');

INSERT INTO posts (title, content, author_id, published) VALUES
('Primer post', 'Contenido del post', 1, true),
('Segundo post', 'Más contenido', 2, false);