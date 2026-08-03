# Xllent Food – local development

## Prerequisites

- Java 17
- Node.js 20 or newer
- PostgreSQL running locally

Create the database once:

```sql
CREATE DATABASE xllent_food;
```

## Start the backend

In PowerShell at the repository root, load the development environment values and run Spring Boot:

```powershell
. .\backend.env.example
.\mvnw.cmd spring-boot:run
```

The API starts at `http://localhost:8082`. On a new database, this creates the super-admin account:

- Email: `superadmin@xllentretailers.com`
- Password: `SuperAdmin@123`

The bootstrap does not change an existing account. To reset a pre-existing account, update its password in PostgreSQL (as a BCrypt hash) or use a password-reset endpoint.

## Start the frontend

Open a second PowerShell window:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
```

Open `http://localhost:5173/login`. The committed `frontend/.env` targets the deployed API; for local development, change it to:

```env
VITE_API_URL=http://localhost:8082
VITE_ENABLE_SOCKET=false
```

Restart Vite after changing `.env`.
