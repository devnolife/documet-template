# API Usage Guide

## Base URL

```
Development: http://localhost:8080/api/v1
Production: https://your-domain.com/api/v1
```

## Authentication

Some endpoints require authentication using JWT tokens.

### Headers

```http
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "ERROR_CODE",
  "details": { ... },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Document Endpoints

### 1. Generate Document

Generate a new document from template.

**Endpoint:** `POST /documents/generate`

**Auth:** Optional

**Rate Limit:** 20 requests / 10 minutes

**Request Body:**

```json
{
  "type": "kkp",
  "prodi": "informatika",
  "data": {
    "nim": "123456",
    "nama": "John Doe",
    "judul": "Sistem Informasi Akademik",
    "pembimbing1": "Dr. Jane Smith",
    "pembimbing2": "Prof. Bob Johnson",
    "tanggal": "2025-01-15"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Document generated successfully",
  "data": {
    "document": {
      "id": "uuid",
      "type": "kkp",
      "prodi": "informatika",
      "file_path": "/storage/outputs/informatika_kkp_timestamp.docx",
      "hash": "sha256_hash",
      "status": "pending",
      "created_at": "2025-01-01T00:00:00.000Z"
    },
    "filePath": "/storage/outputs/informatika_kkp_timestamp.docx"
  }
}
```

### 2. List Documents

Get paginated list of documents.

**Endpoint:** `GET /documents`

**Auth:** Required

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `type` (optional): Filter by document type
- `prodi` (optional): Filter by prodi
- `status` (optional): Filter by status (pending/completed/signed)
- `sortBy` (optional): Sort field (default: created_at)
- `sortOrder` (optional): Sort order (asc/desc, default: desc)

**Example:**

```http
GET /documents?page=1&limit=20&prodi=informatika&status=pending
```

**Response:**

```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "data": [
      {
        "id": "uuid",
        "type": "kkp",
        "prodi": "informatika",
        "status": "pending",
        "created_at": "2025-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### 3. Get Document by ID

**Endpoint:** `GET /documents/:id`

**Auth:** Public

**Response:**

```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "id": "uuid",
    "type": "kkp",
    "prodi": "informatika",
    "file_path": "/storage/outputs/file.docx",
    "hash": "sha256_hash",
    "status": "pending",
    "metadata": { ... },
    "created_at": "2025-01-01T00:00:00.000Z",
    "document_signatures": []
  }
}
```

### 4. Download Document

**Endpoint:** `GET /documents/:id/download`

**Auth:** Public

**Response:** Binary file (application/vnd.openxmlformats-officedocument.wordprocessingml.document)

### 5. Verify Document

Get verification information for a document.

**Endpoint:** `GET /documents/:id/verify`

**Auth:** Public

**Response:**

```json
{
  "success": true,
  "message": "Verification info retrieved successfully",
  "data": {
    "documentId": "uuid",
    "hash": "sha256_hash",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "type": "kkp",
    "prodi": "informatika",
    "status": "signed",
    "signatures": 2,
    "qrCode": "/storage/qrcodes/uuid.png"
  }
}
```

## Signature Endpoints

### 1. Sign Document

Sign a document with EdDSA signature.

**Endpoint:** `POST /signatures/sign`

**Auth:** Required

**Rate Limit:** 30 requests / 15 minutes

**Request Body:**

```json
{
  "documentId": "uuid",
  "signerId": "uuid",
  "metadata": {
    "location": "Bandung",
    "reason": "Approval"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Document signed successfully",
  "data": {
    "signature": {
      "id": "uuid",
      "document_id": "uuid",
      "signer_id": "uuid",
      "signature": "eddsa_signature_hex",
      "signed_at": "2025-01-01T00:00:00.000Z"
    },
    "completed": false,
    "totalSignatures": 1,
    "requiredSignatures": 2
  }
}
```

### 2. Verify Document Signatures

Verify all signatures on a document.

**Endpoint:** `GET /signatures/verify/:documentId`

**Auth:** Public

**Response:**

```json
{
  "success": true,
  "message": "Document verification successful",
  "data": {
    "valid": true,
    "documentId": "uuid",
    "totalSignatures": 2,
    "validSignatures": 2,
    "invalidSignatures": 0,
    "signatures": [
      {
        "id": "uuid",
        "signer": {
          "name": "Dr. Jane Smith",
          "role": "dosen_pembimbing"
        },
        "valid": true,
        "signed_at": "2025-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### 3. Get Document Signatures

**Endpoint:** `GET /signatures/document/:documentId`

**Auth:** Public

**Response:**

```json
{
  "success": true,
  "message": "Signatures retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "document_id": "uuid",
      "signer_id": "uuid",
      "signature": "eddsa_signature_hex",
      "signed_at": "2025-01-01T00:00:00.000Z",
      "signers": {
        "name": "Dr. Jane Smith",
        "role": "dosen_pembimbing",
        "prodi": "informatika"
      }
    }
  ]
}
```

### 4. Create Signer

Create a new signer with EdDSA key pair.

**Endpoint:** `POST /signatures/signers`

**Auth:** Required (Admin only)

**Request Body:**

```json
{
  "nbm": "123456",
  "name": "Dr. Jane Smith",
  "role": "dosen_pembimbing",
  "prodi": "informatika",
  "email": "jane@example.com",
  "phone": "08123456789",
  "position": "Dosen Pembimbing 1"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Signer created successfully",
  "data": {
    "id": "uuid",
    "nbm": "123456",
    "name": "Dr. Jane Smith",
    "role": "dosen_pembimbing",
    "prodi": "informatika",
    "public_key": "ed25519_public_key_hex",
    "status": "active",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
}
```

### 5. List Signers

**Endpoint:** `GET /signatures/signers`

**Auth:** Required

**Query Parameters:**

- `page` (optional): Page number
- `limit` (optional): Items per page
- `role` (optional): Filter by role
- `prodi` (optional): Filter by prodi

**Response:**

```json
{
  "success": true,
  "message": "Signers retrieved successfully",
  "data": {
    "data": [
      {
        "id": "uuid",
        "nbm": "123456",
        "name": "Dr. Jane Smith",
        "role": "dosen_pembimbing",
        "prodi": "informatika",
        "status": "active"
      }
    ],
    "pagination": { ... }
  }
}
```

### 6. Rotate Signer Keys

Generate new EdDSA key pair for a signer.

**Endpoint:** `POST /signatures/signers/:id/rotate-keys`

**Auth:** Required (Admin only)

**Response:**

```json
{
  "success": true,
  "message": "Signer keys rotated successfully",
  "data": {
    "id": "uuid",
    "public_key": "new_ed25519_public_key_hex",
    "updated_at": "2025-01-01T00:00:00.000Z"
  }
}
```

## Admin Endpoints

All admin endpoints require admin authentication.

### 1. Get Statistics

**Endpoint:** `GET /admin/statistics`

**Auth:** Admin

**Response:**

```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "documents": {
      "total": 1234,
      "pending": 56,
      "completed": 1178
    },
    "signatures": {
      "total": 2468
    },
    "signers": {
      "total": 50,
      "active": 48
    },
    "timestamp": "2025-01-01T00:00:00.000Z"
  }
}
```

### 2. System Health

**Endpoint:** `GET /admin/health`

**Auth:** Admin

**Response:**

```json
{
  "success": true,
  "message": "System is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2025-01-01T00:00:00.000Z",
    "uptime": 86400,
    "memory": {
      "rss": 100000000,
      "heapTotal": 50000000,
      "heapUsed": 30000000
    },
    "services": {
      "database": {
        "status": "connected"
      },
      "fileSystem": {
        "status": "accessible"
      }
    }
  }
}
```

### 3. Export Data

**Endpoint:** `GET /admin/export`

**Auth:** Admin

**Query Parameters:**

- `type`: Export type (documents/signers/signatures)
- `format`: Export format (json)

**Example:**

```http
GET /admin/export?type=documents&format=json
```

**Response:** JSON file download

## Error Codes

| Code                  | Description                   |
| --------------------- | ----------------------------- |
| `VALIDATION_ERROR`    | Request validation failed     |
| `DOCUMENT_NOT_FOUND`  | Document not found            |
| `SIGNATURE_NOT_FOUND` | Signature not found           |
| `SIGNER_NOT_FOUND`    | Signer not found              |
| `TEMPLATE_NOT_FOUND`  | Template file not found       |
| `INVALID_SIGNATURE`   | Signature verification failed |
| `UNAUTHORIZED`        | Authentication required       |
| `FORBIDDEN`           | Insufficient permissions      |
| `RATE_LIMIT_EXCEEDED` | Too many requests             |
| `INTERNAL_ERROR`      | Internal server error         |

## Rate Limits

| Endpoint Type        | Limit                     |
| -------------------- | ------------------------- |
| General API          | 100 requests / 15 minutes |
| Document Generation  | 20 requests / 10 minutes  |
| Signature Operations | 30 requests / 15 minutes  |
| Admin Operations     | 10 requests / 15 minutes  |

## Code Examples

### JavaScript (Fetch)

```javascript
// Generate document
const response = await fetch('http://localhost:8080/api/v1/documents/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'kkp',
    prodi: 'informatika',
    data: {
      nim: '123456',
      nama: 'John Doe',
    },
  }),
});

const result = await response.json();
console.log(result);
```

### cURL

```bash
# Generate document
curl -X POST http://localhost:8080/api/v1/documents/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "kkp",
    "prodi": "informatika",
    "data": {
      "nim": "123456",
      "nama": "John Doe"
    }
  }'

# Sign document (with auth)
curl -X POST http://localhost:8080/api/v1/signatures/sign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "documentId": "uuid",
    "signerId": "uuid"
  }'
```

### Python (Requests)

```python
import requests

# Generate document
response = requests.post(
    'http://localhost:8080/api/v1/documents/generate',
    json={
        'type': 'kkp',
        'prodi': 'informatika',
        'data': {
            'nim': '123456',
            'nama': 'John Doe'
        }
    }
)

result = response.json()
print(result)
```

## Best Practices

1. **Always handle errors** - Check `success` field in response
2. **Respect rate limits** - Implement exponential backoff
3. **Validate input** - Validate data before sending
4. **Use HTTPS** - In production environments
5. **Store JWT securely** - Never expose in client-side code
6. **Log requests** - For debugging and monitoring
7. **Cache responses** - When appropriate
8. **Handle timeouts** - Set reasonable timeout values

## Support

For API support:

- Documentation: `/api/docs`
- Health check: `/api/v1/health`
- GitHub Issues: [Repository URL]
