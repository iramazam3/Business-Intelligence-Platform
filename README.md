# Catalyst – Business Intelligence Platform

Catalyst is a full-stack Business Intelligence Platform built with React, Next.js, TypeScript, Prisma ORM, PostgreSQL, and Tailwind CSS. It enables businesses to manage customers, products, and orders while providing SQL-backed analytics through interactive dashboards, KPI cards, and data visualizations

![Home](screenshots/home.png)

---

## Features

### Dashboard

- Business KPI dashboard
- Monthly revenue trends
- Revenue by product
- Top customers by revenue
- Orders by status
- Automatically generated business insights

![Dashboard](screenshots/dashboard.png)

### Customer Management

- Create customers
- View customer directory
- Update customer information
- Delete customers
- Search customers

![Customers](screenshots/customers.png)

### Product Management

- Create products
- Update product information
- Delete products
- Search products
- Inventory tracking

![Products](screenshots/products.png)

### Order Management

- Create orders
- Update order status
- Delete orders
- Search orders
- Automatic order total calculation

![Orders](screenshots/orders.png)

### User Experience

- Responsive layout
- Sidebar navigation
- Modern SaaS interface
- Loading states
- Empty states
- Error handling
- Delete confirmation dialogs
- Disabled submit buttons while saving
- Custom 404 page

---

## Tech Stack

### Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- Recharts

### Backend

- Next.js Route Handlers
- RESTful APIs
- Prisma ORM

### Database

- PostgreSQL

---

## Project Structure

```text
app/
├── api/
│   ├── analytics/
│   ├── customers/
│   ├── products/
│   └── orders/
├── customers/
├── dashboard/
├── orders/
├── products/

components/
├── customers/
├── dashboard/
├── layout/
├── orders/
├── products/
└── ui/

lib/
├── prisma.ts
└── format.ts

prisma/
├── schema.prisma
└── seed.ts
```

---

## Database Design

### Customer

- id
- name
- company
- email
- phone
- region
- createdAt
- updatedAt

### Product

- id
- name
- category
- price
- stockQuantity
- createdAt
- updatedAt

### Order

- id
- customerId
- productId
- quantity
- unitPrice
- totalAmount
- status
- orderDate
- createdAt
- updatedAt

### Relationships

- One Customer → Many Orders
- One Product → Many Orders
- One Order → One Customer
- One Order → One Product

---

## REST API

### Customers

```
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Products

```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```
GET    /api/orders
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
```

### Analytics

```
GET /api/analytics
```

The analytics endpoint calculates all dashboard metrics directly from the PostgreSQL database, including:

- Total Revenue
- Total Orders
- Average Order Value
- Total Customers
- Total Products
- Monthly Revenue
- Revenue by Product
- Top Customers
- Orders by Status
- Highest Revenue Product
- Best Customer
- Pending Orders
- Revenue Trend

---

## Sample Data

The application includes realistic fictional business data for demonstration purposes.

- 30 Customers
- 20 AI SaaS Products
- 150 Orders

Orders span the previous 12 months and automatically generate meaningful dashboard analytics.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/iramazam3/Business-Intelligence-Platform
cd catalyst-bi-platform
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/catalyst_db?schema=public"
```

### Run database migrations

```bash
npm run db:migrate
```

### Seed the database

```bash
npm run db:seed
```

### Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Author

**Iram Azam**

M.S. Computer Information Technology

Purdue University
