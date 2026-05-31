# 🌯 WrapBrand — Modern Wraps Ordering Website

A full-stack food e-commerce application for a modern wraps brand. Built with **React** (frontend) and **Spring Boot** (backend), using **PostgreSQL** for data persistence.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite, React Router v6, Axios, Vanilla CSS |
| Backend | Java 17, Spring Boot 3.x, Spring Security, JWT |
| ORM | Spring Data JPA + Hibernate |
| Database | PostgreSQL (Flyway migrations) |
| Deployment | Render (Web Service + Static Site + PostgreSQL) |

---

## 📁 Project Structure

```
wrapbrand/
├── frontend/          # React + Vite application
├── backend/           # Spring Boot application
├── database/          # Standalone SQL schema & seed scripts
├── docs/              # API reference & deployment guide
├── render.yaml        # Render deployment blueprint
├── .gitignore
└── README.md
```

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.8+
- PostgreSQL 15+

### 1. Database Setup

```bash
# Create a PostgreSQL database
psql -U postgres -c "CREATE DATABASE wrapbrand;"
```

### 2. Backend Setup

```bash
cd backend

# Configure environment variables (copy and edit)
cp src/main/resources/application.yml.example src/main/resources/application.yml

# Set these environment variables or edit application.yml:
# DB_URL=jdbc:postgresql://localhost:5432/wrapbrand
# DB_USERNAME=postgres
# DB_PASSWORD=yourpassword
# JWT_SECRET=your-256-bit-secret-key-here

# Run the application (Flyway will auto-create tables and seed data)
./mvnw spring-boot:run
```

The backend starts on **http://localhost:8080**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend starts on **http://localhost:5173**

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products (paginated) |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/category/{id}` | Filter by category |
| GET | `/api/categories` | Get all categories |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/cart` | Get user cart (auth required) |
| POST | `/api/cart/add` | Add to cart (auth required) |
| PUT | `/api/cart/items/{id}` | Update cart item (auth required) |
| DELETE | `/api/cart/items/{id}` | Remove cart item (auth required) |
| POST | `/api/orders` | Place order (auth required) |
| GET | `/api/orders` | Get user orders (auth required) |

Full API docs: [docs/api-reference.md](docs/api-reference.md)

---

## ☁️ Deploy on Render

See [docs/deployment-guide.md](docs/deployment-guide.md) for full instructions.

**Quick steps:**
1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml` and provision all services

---

## 📜 License

MIT
"# Wrap-website" 
