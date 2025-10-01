# Migration Guide - Old to New Structure

## Ringkasan Perubahan

Proyek telah di-refactor dari struktur flat menjadi **Clean Architecture** dengan layer yang jelas dan separation of concerns yang baik.

## Struktur Lama vs Baru

### Old Structure

```
├── api/
│   └── index.js
├── controllers/
│   └── eddsa-document-controller.js
├── routes/
│   └── eddsa-document-controller.js
├── services/
│   └── eddsa-document-service.js
├── utils/
│   └── eddsa-crypto.js
├── templates/
└── server.js
```

### New Structure

```
src/
├── api/
│   └── v1/
│       ├── controllers/
│       ├── middlewares/
│       └── routes/
├── config/
├── core/
│   ├── repositories/
│   └── services/
├── infrastructure/
│   ├── database/
│   └── storage/
├── shared/
│   ├── constants/
│   ├── helpers/
│   └── utils/
└── app.js
```

## Migration Mapping

### 1. Controllers

**Old:**

```javascript
// controllers/eddsa-document-controller.js
exports.generateDocument = async (req, res) => {
  // direct database access
};
```

**New:**

```javascript
// src/api/v1/controllers/document.controller.js
class DocumentController {
  async generateDocument(req, res, next) {
    // uses service layer
    const result = await documentService.generateDocument(type, prodi, data);
  }
}
```

### 2. Services

**Old:**

```javascript
// services/eddsa-document-service.js
const generateDocument = async (data) => {
  // mixed business logic and data access
};
```

**New:**

```javascript
// src/core/services/document/document.service.js
class DocumentService {
  async generateDocument(type, prodi, data, userId) {
    // pure business logic
    // uses repository for data access
    const document = await this.documentRepository.create(data);
  }
}
```

### 3. Routes

**Old:**

```javascript
// routes/eddsa-document-controller.js
router.post('/generate', controller.generateDocument);
```

**New:**

```javascript
// src/api/v1/routes/document.routes.js
router.post(
  '/generate',
  documentGenerationLimiter,
  validateRequired(['type', 'prodi', 'data']),
  optionalAuth,
  asyncHandler(documentController.generateDocument)
);
```

### 4. Database Access

**Old:**

```javascript
// Direct Prisma usage in controller/service
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

await prisma.documents.create({ data });
```

**New:**

```javascript
// Repository pattern with abstraction
// src/core/repositories/document.repository.js
class DocumentRepository extends BaseRepository {
  async createDocument(data) {
    return this.create(data);
  }
}
```

### 5. Utilities

**Old:**

```javascript
// utils/eddsa-crypto.js
const crypto = require('crypto');
// scattered utility functions
```

**New:**

```javascript
// src/shared/utils/crypto.util.js
class CryptoUtil {
  static generateEdDSAKeyPair() {}
  static signData() {}
  static verifySignature() {}
}
```

## API Endpoint Changes

### Old Endpoints

```
POST /api/generate
GET  /api/document/:id
POST /api/sign
```

### New Endpoints

```
POST /api/v1/documents/generate
GET  /api/v1/documents/:id
POST /api/v1/signatures/sign
GET  /api/v1/signatures/verify/:documentId
```

## Environment Variables

### Added Variables

```bash
# Security
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h

# CORS
CORS_ORIGIN=*

# Logging
LOG_LEVEL=info
LOG_FORMAT=combined

# Database Pool
DB_POOL_MIN=2
DB_POOL_MAX=10
```

## Code Examples

### Example 1: Generate Document

**Old Code:**

```javascript
const response = await fetch('http://localhost:8080/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'kkp',
    prodi: 'informatika',
    data: { nim: '123456', nama: 'John' },
  }),
});
```

**New Code:**

```javascript
const response = await fetch('http://localhost:8080/api/v1/documents/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'kkp',
    prodi: 'informatika',
    data: { nim: '123456', nama: 'John' },
  }),
});
```

### Example 2: Sign Document

**Old Code:**

```javascript
const response = await fetch('http://localhost:8080/api/sign', {
  method: 'POST',
  body: JSON.stringify({
    documentId: 'doc-id',
    signerId: 'signer-id',
  }),
});
```

**New Code:**

```javascript
const response = await fetch('http://localhost:8080/api/v1/signatures/sign', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_JWT_TOKEN',
  },
  body: JSON.stringify({
    documentId: 'doc-id',
    signerId: 'signer-id',
  }),
});
```

## Breaking Changes

### 1. API URL Structure

- All endpoints now have `/v1/` prefix
- Example: `/api/generate` → `/api/v1/documents/generate`

### 2. Response Format

Standardized response format:

```javascript
{
  success: true,
  message: "Operation successful",
  data: { ... },
  timestamp: "2025-01-01T00:00:00.000Z"
}
```

### 3. Error Format

Standardized error format:

```javascript
{
  success: false,
  message: "Error message",
  error: "ERROR_CODE",
  details: { ... },
  timestamp: "2025-01-01T00:00:00.000Z"
}
```

### 4. Authentication

Some endpoints now require authentication:

- Document generation: Optional auth
- Signature operations: Required auth
- Admin operations: Required admin role

### 5. Rate Limiting

Rate limits applied to all endpoints:

- General API: 100 requests / 15 minutes
- Document generation: 20 requests / 10 minutes
- Signature operations: 30 requests / 15 minutes
- Admin operations: 10 requests / 15 minutes

## Migration Steps

### Step 1: Update Environment

```bash
# Copy new environment template
cp .env.example .env

# Update DATABASE_URL and other configs
nano .env
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Database Migration

```bash
npx prisma migrate dev
npx prisma generate
```

### Step 4: Update API Clients

Update all API calls to use new endpoint structure:

- Add `/v1/` to all API paths
- Update request/response handling for new format
- Add authentication headers where required

### Step 5: Test

```bash
# Run tests
npm test

# Start development server
npm run dev
```

## Backward Compatibility

### Old Routes (Deprecated)

Old routes are **not** maintained in the new structure. You must update all clients to use the new API.

### Migration Period

Recommended migration timeline:

- Week 1-2: Update backend, deploy side-by-side
- Week 3-4: Update all clients
- Week 5: Remove old code

## New Features

### 1. Repository Pattern

Clean separation between business logic and data access.

### 2. Service Layer

Centralized business logic with clear responsibilities.

### 3. Middleware Stack

- Error handling
- Validation
- Rate limiting
- Authentication
- File upload

### 4. Logging

Winston-based logging with rotation and levels.

### 5. Code Quality

ESLint and Prettier for consistent code style.

### 6. Testing

Jest configuration for unit and integration tests.

### 7. Documentation

Comprehensive API documentation and guides.

## Troubleshooting

### Issue: "Cannot find module"

**Solution:** Run `npm install` to install all dependencies.

### Issue: Database connection error

**Solution:** Check `DATABASE_URL` in `.env` file.

### Issue: "Port already in use"

**Solution:** Change `PORT` in `.env` or kill the process using the port.

### Issue: Authentication errors

**Solution:** Ensure `JWT_SECRET` is set in `.env` file.

### Issue: Template not found

**Solution:** Ensure templates are in the `templates/` directory with correct structure.

## Support

For migration support or issues:

1. Check documentation in `docs/` directory
2. Review error logs in `logs/` directory
3. Check the CHANGELOG.md for breaking changes

## Additional Resources

- [Installation Guide](./guides/installation.md)
- [Architecture Overview](./architecture/system-design.md)
- [API Documentation](../README.md)
- [Security Guide](./architecture/security.md)
