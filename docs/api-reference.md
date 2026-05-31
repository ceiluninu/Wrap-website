# WrapBrand REST API Reference

Base URL: `http://localhost:8080/api` (Local) / `https://wrapbrand-backend.onrender.com/api` (Production)

## Authentication

All endpoints under `/api/cart`, `/api/orders`, and user-specific endpoints require an authorization header:
`Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication (`/api/auth`)

### Register
`POST /auth/register`
Creates a new user and returns a token.
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Login
`POST /auth/login`
Authenticates user and returns a token.
**Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
**Response:**
```json
{
  "token": "eyJhbG...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## 2. Products (`/api/products`)

### Get All Products
`GET /products`
Returns a paginated list of all wraps. Accepts `?page=0&size=10`.

### Get Product By ID
`GET /products/{id}`

### Search Products
`GET /products/search?q={query}`
Searches products by name or description. Note: Requires the query parameter `q`.

### Get By Category
`GET /products/category/{categoryId}`
Returns products assigned to a specific category.

### Get Popular Products
`GET /products/popular`

### Get Featured Deals
`GET /products/featured`

---

## 3. Categories (`/api/categories`)

### Get All Categories
`GET /categories`
Returns a list of all categories.

---

## 4. Shopping Cart (`/api/cart`) *Requires Auth*

### Get User Cart
`GET /cart`
Returns the current user's cart and items.

### Add Item to Cart
`POST /cart/add`
**Body:**
```json
{
  "productId": 3,
  "quantity": 2
}
```

### Update Item Quantity
`PUT /cart/items/{itemId}`
**Body:**
```json
{
  "quantity": 3
}
```

### Remove Item from Cart
`DELETE /cart/items/{itemId}`

---

## 5. Orders (`/api/orders`) *Requires Auth*

### Place Order
`POST /orders`
Creates an order from the user's current cart and clears the cart.
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main St",
  "city": "New York",
  "zip": "10001"
}
```

### Get User Orders
`GET /orders`
Returns all past orders for the authenticated user, ordered by creation date descending.
