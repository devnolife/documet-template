# Quick Start Guide

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 14.0
- npm or yarn

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/devnolife/documet-template.git
cd generate-document-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

Required environment variables:

```env
NODE_ENV=development
PORT=8080
HOST=0.0.0.0
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET=your-secret-key-here
```

### 4. Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# (Optional) Seed database
npx prisma db seed
```

### 5. Start Server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server will start at `http://localhost:8080`

## First API Call

### Generate Document

```bash
curl -X POST http://localhost:8080/api/v1/documents/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "kkp",
    "prodi": "informatika",
    "data": {
      "nim": "123456",
      "nama": "John Doe",
      "judul": "My Project Title"
    }
  }'
```

### Response

```json
{
  "success": true,
  "message": "Document generated successfully",
  "data": {
    "document": {
      "id": "uuid",
      "type": "kkp",
      "prodi": "informatika",
      "file_path": "/storage/outputs/informatika_kkp_timestamp.docx"
    }
  }
}
```

## Verify Installation

### Check Health

```bash
curl http://localhost:8080/api/v1/health
```

### Check API Documentation

Open browser: `http://localhost:8080/api/docs`

## Project Structure

```
generate-document-api/
├── src/
│   ├── api/v1/              # API endpoints
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Express middlewares
│   │   └── routes/          # Route definitions
│   ├── config/              # Configuration files
│   ├── core/                # Business logic
│   │   ├── repositories/    # Data access layer
│   │   └── services/        # Business services
│   ├── infrastructure/      # External services
│   │   ├── database/        # Database connection
│   │   └── storage/         # File storage
│   ├── shared/              # Shared utilities
│   │   ├── constants/       # Constants
│   │   ├── helpers/         # Helper functions
│   │   └── utils/           # Utility functions
│   └── app.js              # Express app setup
├── templates/              # Document templates
├── storage/                # File storage
├── logs/                   # Application logs
└── server.js              # Server entry point
```

## Available Scripts

```bash
# Development
npm run dev          # Start with nodemon (auto-reload)

# Production
npm start            # Start server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Kill process on port 8080 (Linux/Mac)
lsof -ti:8080 | xargs kill -9
```

### Database Connection Error

1. Check PostgreSQL is running
2. Verify `DATABASE_URL` in `.env`
3. Test connection: `npx prisma db pull`

### Template Not Found

1. Ensure template exists: `templates/informatika/kkp.docx`
2. Check file permissions
3. Verify prodi and type parameters

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Configure Templates** - Add your document templates to `templates/` directory
2. **Create Signers** - Use admin endpoints to create signers
3. **Generate Documents** - Use the API to generate documents
4. **Sign Documents** - Add digital signatures to documents
5. **Verify Documents** - Verify document authenticity

## Documentation

- [Installation Guide](./docs/guides/installation.md)
- [API Usage Guide](./docs/guides/api-usage.md)
- [Migration Guide](./docs/guides/migration.md)
- [Architecture Overview](./docs/architecture/system-design.md)
- [Security Guide](./docs/architecture/security.md)

## Support

- **Issues:** [GitHub Issues](https://github.com/devnolife/documet-template/issues)
- **Documentation:** `/api/docs`
- **Health Check:** `/api/v1/health`

## License

ISC License - see LICENSE file for details
