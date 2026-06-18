# MiniBlog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar authors y posts.

El proyecto implementa operaciones CRUD completas, validaciones básicas, pruebas automatizadas y documentación OpenAPI.

---

# API desplegada

URL pública:

https://miniblog-api-production-9835.up.railway.app

Health Check:

```bash
curl https://miniblog-api-production-9835.up.railway.app
```

---

# Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* pg
* dotenv
* Vitest
* Supertest
* OpenAPI

---

# Instalación local

## 1. Clonar repositorio

```bash
git clone https://github.com/nahuelcba22/miniblog-api.git
cd miniblog-api
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example`.

### .env.example

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password
```

---

# Configuración PostgreSQL

## Crear base de datos

```sql
CREATE DATABASE miniblog;
```

---

## Ejecutar script SQL

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
  FOREIGN KEY (author_id)
  REFERENCES authors(id)
  ON DELETE CASCADE
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

# Ejecutar servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Servidor local:

```txt
http://localhost:3000
```

---

# Endpoints principales

## Authors

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET | /api/authors | Obtener todos los authors |
| GET | /api/authors/:id | Obtener author por ID |
| POST | /api/authors | Crear author |
| PUT | /api/authors/:id | Actualizar author |
| DELETE | /api/authors/:id | Eliminar author |

---

## Posts

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET | /api/posts | Obtener todos los posts |
| GET | /api/posts/:id | Obtener post por ID |
| GET | /api/posts/author/:authorId | Obtener posts de un author |
| POST | /api/posts | Crear post |
| PUT | /api/posts/:id | Actualizar post |
| DELETE | /api/posts/:id | Eliminar post |

---

# Ejemplos de uso

## Obtener todos los authors

```bash
curl https://miniblog-api-production-9835.up.railway.app/api/authors
```

---

## Obtener un author por ID

```bash
curl https://miniblog-api-production-9835.up.railway.app/api/authors/1
```

---

## Crear author

```bash
curl -X POST https://miniblog-api-production-9835.up.railway.app/api/authors \
-H "Content-Type: application/json" \
-d "{\"name\":\"Juan Perez\",\"email\":\"juan@test.com\",\"bio\":\"Backend Developer\"}"
```

---

## Obtener todos los posts

```bash
curl https://miniblog-api-production-9835.up.railway.app/api/posts
```

---

## Crear post

```bash
curl -X POST https://miniblog-api-production-9835.up.railway.app/api/posts \
-H "Content-Type: application/json" \
-d "{\"title\":\"Nuevo Post\",\"content\":\"Contenido de prueba\",\"author_id\":1}"
```

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

Tests implementados:

* Obtener authors
* Obtener author inexistente
* Crear author
* Validación de author
* Obtener posts
* Obtener post inexistente
* Validación de post
* Obtener posts por author

---

# Documentación OpenAPI

Archivo incluido:

```txt
openapi.yaml
```

Describe los endpoints principales de la API, parámetros y respuestas.

---

# Deployment en Railway

## Pasos básicos

1. Crear proyecto en Railway
2. Crear base PostgreSQL
3. Conectar repositorio GitHub
4. Configurar variables de entorno
5. Realizar deploy automático

---

## Variables de entorno

```env
PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

---

## URL pública

```txt
https://miniblog-api-production-9835.up.railway.app
```

---

# Uso de Inteligencia Artificial

Durante el desarrollo se utilizó inteligencia artificial como herramienta de apoyo para:

* Resolución de errores
* Revisión de consultas SQL
* Validaciones básicas
* Organización del proyecto
* Generación de ejemplos CRUD
* Revisión de documentación
* Corrección de errores en Express y PostgreSQL

Toda la implementación, integración, pruebas y despliegue fueron realizados manualmente por el estudiante.

---

# Autor

Proyecto desarrollado como Proyecto Integrador Backend utilizando:

* Node.js
* Express
* PostgreSQL
* Railway

Autor: Nahuel Córdoba