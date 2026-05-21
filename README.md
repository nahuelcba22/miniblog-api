# MiniBlog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar authors y posts.

El proyecto implementa operaciones CRUD, validaciones básicas, pruebas unitarias mínimas y documentación OpenAPI.

---

# Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* pg
* dotenv
* Vitest
* Supertest

---

# Instalación local

## 1. Clonar el repositorio

```bash
git clone https://github.com/nahuelcba22/miniblog-api
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar variables de entorno

Crear archivo `.env` basado en `.env.example`

## .env.example

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password
```

---

# Configuración de PostgreSQL

## Crear base de datos

```sql
CREATE DATABASE miniblog;
```

---

## Ejecutar scripts SQL

Ejecutar los scripts de creación de tablas y seed.

```sql
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
```

---

## Seed inicial

```sql
INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Backend dev'),
('Carlos Ruiz', 'carlos@example.com', 'DB specialist');

INSERT INTO posts (title, content, author_id, published) VALUES
('Primer post', 'Contenido del post', 1, true),
('Segundo post', 'Más contenido', 2, false);
```

---

# Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Servidor disponible en:

```txt
http://localhost:3000
```

---

# Endpoints principales

## Authors

| Método | Endpoint         | Descripción               |
| ------ | ---------------- | ------------------------- |
| GET    | /api/authors     | Obtener todos los authors |
| GET    | /api/authors/:id | Obtener author por ID     |
| POST   | /api/authors     | Crear author              |
| PUT    | /api/authors/:id | Actualizar author         |
| DELETE | /api/authors/:id | Eliminar author           |

---

## Posts

| Método | Endpoint                    | Descripción                          |
| ------ | --------------------------- | ------------------------------------ |
| GET    | /api/posts                  | Obtener todos los posts              |
| GET    | /api/posts/:id              | Obtener post por ID                  |
| GET    | /api/posts/author/:authorId | Obtener posts con detalle del author |
| POST   | /api/posts                  | Crear post                           |
| PUT    | /api/posts/:id              | Actualizar post                      |
| DELETE | /api/posts/:id              | Eliminar post                        |

---

# Validaciones implementadas

## Authors

* name obligatorio
* email obligatorio
* email único en base de datos

## Posts

* title obligatorio
* content obligatorio
* author_id obligatorio

---

# Ejecutar tests

```bash
npm test
```

---

# Documentación OpenAPI

Archivo incluido:

```txt
openapi.yaml
```

La documentación describe los endpoints principales de la API.

---

# Deployment en Railway

## Pasos básicos

1. Crear proyecto en Railway
2. Conectar repositorio GitHub
3. Configurar variables de entorno
4. Deploy automático

## Variables necesarias

```env
PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

---

# Uso de Inteligencia Artificial

Durante el desarrollo se utilizó inteligencia artificial como apoyo para:

* Resolución de errores
* Revisión de endpoints
* Validaciones básicas
* Organización del README
* Generación de ejemplos CRUD
* Correcciones de SQL y Express

Toda la integración y pruebas fueron realizadas manualmente por el estudiante.

---

# Autor

Proyecto desarrollado para práctica académica de backend con Node.js + PostgreSQL.
