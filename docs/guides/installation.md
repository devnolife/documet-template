# 📚 Installation Guide

## Prerequisites

### Required Software
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v14.0 or higher
- **Git**: Latest version

### System Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: Minimum 1GB free space

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/devnolife/documet-template.git
cd generate-document-api
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- express
- @prisma/client
- docxtemplater
- moment
- qrcode
- And more...

### 3. Database Setup

#### Create PostgreSQL Database

```sql
CREATE DATABASE document_api;
CREATE USER document_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE document_api TO document_user;
```

#### Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
NODE_ENV=development
PORT=8080
HOST=0.0.0.0

# Database - Update with your credentials
DATABASE_URL="postgresql://document_user:your_password@localhost:5432/document_api"

# Storage
MAX_FILE_SIZE=10485760

# Security
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h

# Application
APP_URL=http://localhost:8080

# Logging
LOG_LEVEL=info
```

### 4. Run Prisma Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run seed
```

### 5. Initialize Storage Directories

The application will auto-create storage directories on first run, or manually create:

```bash
# Windows PowerShell
New-Item -ItemType Directory -Path storage\templates, storage\outputs, storage\uploads, storage\qrcodes, storage\signatures -Force

# Linux/Mac
mkdir -p storage/{templates,outputs,uploads,qrcodes,signatures}
```

### 6. Copy Template Files

Copy your document templates to the appropriate directories:

```
storage/
└── templates/
    ├── informatika/
    │   └── kkp.docx
    ├── elektro/
    │   └── kkp.docx
    ├── arsitektur/
    │   └── kkp.docx
    ├── pengairan/
    │   └── kkp.docx
    └── pwk/
        └── kkp.docx
```

### 7. Start the Application

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:8080`

## Verification

### Check API Health

```bash
curl http://localhost:8080/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "uptime": 123.456,
    "timestamp": "2025-10-01T12:00:00.000Z"
  }
}
```

### Check Database Connection

```bash
npm run prisma:studio
```

This will open Prisma Studio at `http://localhost:5555` where you can view your database.

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `Can't reach database server`

**Solutions**:
- Check PostgreSQL is running: `systemctl status postgresql` (Linux) or check Services (Windows)
- Verify database credentials in `.env`
- Check firewall settings
- Ensure PostgreSQL is listening on correct port (default: 5432)

#### 2. Port Already in Use

**Error**: `Port 8080 is already in use`

**Solutions**:
- Change PORT in `.env` file
- Kill process using port 8080:
  ```bash
  # Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -i :8080
  kill -9 <PID>
  ```

#### 3. Prisma Migration Fails

**Error**: `Migration failed`

**Solutions**:
- Drop and recreate database
- Check database user permissions
- Ensure DATABASE_URL is correct
- Try: `npx prisma migrate reset`

#### 4. Template Not Found

**Error**: `Template not found`

**Solutions**:
- Verify template files exist in correct directories
- Check file permissions
- Ensure template paths in database match actual files

#### 5. Module Not Found

**Error**: `Cannot find module`

**Solutions**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Optional Setup

### Install Development Tools

```bash
# ESLint and Prettier
npm install --save-dev eslint prettier eslint-config-prettier

# Testing tools (already in package.json)
npm install --save-dev jest supertest
```

### Configure VS Code

Install recommended extensions:
- ESLint
- Prettier
- Prisma
- REST Client

Settings are automatically configured in `.vscode/settings.json`

### Setup Git Hooks (Optional)

```bash
npm install --save-dev husky lint-staged

# Initialize Husky
npx husky-init
```

## Next Steps

After successful installation:

1. **Seed the database** with initial data: `npm run seed`
2. **Review documentation** in `/docs` directory
3. **Test API endpoints** using provided Postman collection
4. **Configure templates** for your program studi
5. **Setup EdDSA signers** for document signing

## Getting Help

- **Documentation**: Check `/docs` directory
- **Issues**: Create an issue on GitHub
- **Contact**: devnolife@example.com

## Quick Start Script

Save this as `quick-start.sh` (Linux/Mac) or `quick-start.ps1` (Windows):

```bash
#!/bin/bash

echo "🚀 Starting Quick Setup..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
echo "📝 Creating .env file..."
cp .env.example .env

# Run migrations
echo "🗄️  Running database migrations..."
npm run prisma:generate
npm run prisma:migrate

# Seed database
echo "🌱 Seeding database..."
npm run seed

# Create storage directories
echo "📁 Creating storage directories..."
mkdir -p storage/{templates,outputs,uploads,qrcodes,signatures}

echo "✅ Setup complete! Run 'npm run dev' to start the server."
```

Run with: `bash quick-start.sh` or `.\quick-start.ps1`
