# 🏗️ System Architecture

## Overview

Generate Document API menggunakan **Clean Architecture** dengan pemisahan concerns yang jelas antara:
- API Layer (Routes, Controllers, Middlewares)
- Core Business Logic (Services, Repositories)
- Infrastructure (Database, Storage)
- Shared Components (Utils, Helpers, Constants)

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    API Layer (v1)                        │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │   Routes     │→ │  Controllers  │→ │  Validators  │ │
│  └──────────────┘  └───────────────┘  └──────────────┘ │
│         ↓                  ↓                   ↓         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Middlewares                            │  │
│  │  (Auth, Validation, Upload, Error, Rate Limit)   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                 Core Business Logic                      │
│  ┌──────────────────┐         ┌────────────────────┐   │
│  │    Services      │ ←─────→ │   Repositories     │   │
│  │  - Document      │         │  - Document        │   │
│  │  - Signature     │         │  - Signature       │   │
│  │  - Notification  │         │  - Signer          │   │
│  │  - Audit         │         │  - Base            │   │
│  └──────────────────┘         └────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Infrastructure                          │
│  ┌──────────────────┐         ┌────────────────────┐   │
│  │    Database      │         │     Storage        │   │
│  │  - Prisma ORM    │         │  - Local Storage   │   │
│  │  - PostgreSQL    │         │  - File System     │   │
│  └──────────────────┘         └────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Shared Components                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐│
│  │  Utils   │  │ Helpers  │  │Constants │  │ Config  ││
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘│
└─────────────────────────────────────────────────────────┘
```

## Key Design Patterns

### 1. Repository Pattern
- Abstraksi data access layer
- Memisahkan business logic dari database operations
- Mudah untuk testing dan switching databases

### 2. Service Layer Pattern
- Enkapsulasi business logic
- Reusable dan testable
- Single Responsibility Principle

### 3. Middleware Pattern
- Cross-cutting concerns (auth, validation, logging)
- Request/Response processing pipeline
- Error handling

### 4. Singleton Pattern
- Database connection
- Logger instance
- Configuration

## Data Flow

### Document Generation Flow
```
1. Client Request → API Route
2. Route → Validation Middleware
3. Validation → Controller
4. Controller → Document Service
5. Document Service → Document Repository (Get template & fields)
6. Document Service → Document Helper (Generate document)
7. Document Helper → QR Code Helper (Generate QR)
8. Document Service → Storage Service (Save file)
9. Controller → Response to Client
```

### Signature Flow
```
1. Client Request → API Route
2. Route → Auth Middleware
3. Auth → Controller
4. Controller → Signature Service
5. Signature Service → Crypto Util (Sign document)
6. Signature Service → Signature Repository (Save signature)
7. Signature Service → Check completion status
8. If complete → Update document status
9. Controller → Response to Client
```

## Technology Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Document Processing**: Docxtemplater
- **Cryptography**: Node.js Crypto (EdDSA)
- **QR Code**: qrcode
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## Security Considerations

1. **Digital Signatures**: EdDSA (Ed25519) for document signing
2. **Data Integrity**: SHA-256 hashing for document verification
3. **Private Key Encryption**: AES-256-GCM for key storage
4. **Input Validation**: Request validation at middleware level
5. **Rate Limiting**: Prevent abuse
6. **CORS**: Configurable cross-origin policies

## Scalability Considerations

1. **Horizontal Scaling**: Stateless API design
2. **Database Connection Pooling**: Efficient resource usage
3. **Caching Layer**: Ready for Redis integration
4. **File Storage**: Easily switchable to S3/Cloud storage
5. **API Versioning**: Support for multiple API versions

## Future Enhancements

- [ ] Redis caching layer
- [ ] Cloud storage integration (AWS S3, GCS)
- [ ] Message queue (RabbitMQ, Kafka)
- [ ] Microservices architecture
- [ ] GraphQL API
- [ ] WebSocket for real-time updates
- [ ] Advanced monitoring and observability
