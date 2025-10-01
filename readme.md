# 📄 Generate Document API - Modern Architecture# 📄 Generate Document API - Modern Architecture

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/devnolife/documet-template/pulls)[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/devnolife/documet-template/pulls)

> **Modern, Secure, and Scalable Document Generation API with Digital Signature Support**> **Modern, Secure, and Scalable Document Generation API with Digital Signature Support**

Developed by **devnolife**Developed by **devnolife**

## 📌 Overview## 📌 Overview

Generate Document API adalah aplikasi berbasis Node.js yang memungkinkan pengguna untuk menghasilkan dokumen berdasarkan template yang telah ditentukan. Aplikasi ini menggunakan **Express.js** sebagai server, **Prisma** untuk interaksi database, dan **Docxtemplater** untuk pembuatan dokumen.Generate Document API adalah aplikasi berbasis Node.js yang memungkinkan pengguna untuk menghasilkan dokumen berdasarkan template yang telah ditentukan. Aplikasi ini menggunakan **Express.js** sebagai server, **Prisma** untuk interaksi database, dan **Docxtemplater** untuk pembuatan dokumen.

### 🆕 Fitur Terbaru### 🆕 Fitur Terbaru: Dynamic Field Detection

- **Dynamic Field Detection** - Sistem deteksi field dinamis dari database, menggantikan sistem hardcodedSistem terbaru menggunakan **deteksi field dinamis dari database**, menggantikan sistem hardcoded sebelumnya. Setiap program studi dapat memiliki template dan field yang berbeda-beda, dan konfigurasi disimpan di database.

- **Clean Architecture** - Struktur proyek modern dengan separation of concerns

- **Multi-Signature Workflow** - Support untuk multiple signers per document## 📋 Prerequisites

- **Enhanced Security** - EdDSA digital signatures dengan AES-256-GCM encryption

- **Node.js** >= 18.0.0

## 📋 Prerequisites- **PostgreSQL** >= 14.0

- **npm** >= 9.0.0

- **Node.js** >= 18.0.0

- **PostgreSQL** >= 14.0## 🚀 Quick Start

- **npm** >= 9.0.0

### 1. Clone Repository

## 🚀 Quick Start

````bash

### 1. Clone Repositorygit clone https://github.com/devnolife/documet-template.git

cd generate-document-api

```bash```

git clone https://github.com/devnolife/documet-template.git

cd generate-document-api### 2. Install Dependencies

````

```bash

### 2. Install Dependenciesnpm install

```

```bash

npm install### 3. Environment Setup

```

````bash

### 3. Environment Setup# Copy environment template

cp .env.example .env

```bash```

# Copy environment template

cp .env.example .envEdit `.env` file with your configuration:

````

```````env

Edit `.env` file with your configuration:NODE_ENV=development

PORT=8080

```envHOST=0.0.0.0

NODE_ENV=developmentDATABASE_URL="postgresql://user:password@localhost:5432/dbname"

PORT=8080JWT_SECRET=your-secret-key-here

HOST=0.0.0.0CORS_ORIGIN=*

DATABASE_URL="postgresql://user:password@localhost:5432/dbname"```

JWT_SECRET=your-secret-key-here

CORS_ORIGIN=*### 4. Database Setup

LOG_LEVEL=info

``````bash

# Generate Prisma Client

### 4. Database Setupnpm run prisma:generate



```bash# Run database migrations

# Generate Prisma Clientnpm run prisma:migrate

npm run prisma:generate

# (Optional) Seed database

# Run database migrationsnpm run db:seed

npm run prisma:migrate```



# (Optional) Seed database### 5. Start Server

npm run db:seed

```**Development Mode:**



### 5. Start Server```bash

npm run dev

**Development Mode:**```



```bash**Production Mode:**

npm run dev

``````bash

npm start

**Production Mode:**```



```bashServer will start at `http://localhost:8080`

npm start

```### 6. Verify Installation



Server will start at `http://localhost:8080`**Check API Health:**



### 6. Verify Installation```bash

curl http://localhost:8080/api/v1/health

**Check API Health:**```



```bash**Generate First Document:**

curl http://localhost:8080/api/v1/health

``````bash

curl -X POST http://localhost:8080/api/v1/documents/generate \

**Generate First Document:**  -H "Content-Type: application/json" \

  -d '{

```bash    "type": "kkp",

curl -X POST http://localhost:8080/api/v1/documents/generate \    "prodi": "informatika",

  -H "Content-Type: application/json" \    "data": {

  -d '{      "nim": "123456",

    "type": "kkp",      "nama": "John Doe",

    "prodi": "informatika",      "judul": "My Project Title"

    "data": {    }

      "nim": "123456",  }'

      "nama": "John Doe",```

      "judul": "My Project Title"

    }**Expected Response:**

  }'

``````json

{

**Expected Response:**  "success": true,

  "message": "Document generated successfully",

```json  "data": {

{    "document": {

  "success": true,      "id": "uuid",

  "message": "Document generated successfully",      "type": "kkp",

  "data": {      "prodi": "informatika",

    "document": {      "file_path": "/storage/outputs/informatika_kkp_timestamp.docx"

      "id": "uuid",    }

      "type": "kkp",  }

      "prodi": "informatika",}

      "file_path": "/storage/outputs/informatika_kkp_timestamp.docx",```

      "hash": "sha256_hash",

      "status": "pending"## 🌟 Features

    },

    "filePath": "/storage/outputs/informatika_kkp_timestamp.docx"### 📋 Supported Prodi

  }

}### Core Features

```````

- ✅ **Dynamic Document Generation** - Template-based document generation using Docxtemplater| Prodi | Code | Template Path | Fields Khusus |

## 🌟 Features

- ✅ **Multi-Program Studi Support** - Informatika, Elektro, Arsitektur, Pengairan, PWK|-------|------|---------------|---------------|

### Core Features

- ✅ **Digital Signature (EdDSA)** - Ed25519 cryptographic signatures| Teknik Informatika | `informatika` | `templates/informatika/kkp.docx` | - |

- ✅ **Dynamic Document Generation** - Template-based document generation using Docxtemplater

- ✅ **Multi-Program Studi Support** - Informatika, Elektro, Arsitektur, Pengairan, PWK- ✅ **QR Code Verification** - Embedded QR codes for document authenticity| Teknik Pengairan | `pengairan` | `templates/pengairan/kkp.docx` | - |

- ✅ **Digital Signature (EdDSA)** - Ed25519 cryptographic signatures

- ✅ **QR Code Verification** - Embedded QR codes for document authenticity- ✅ **Dynamic Field Management** - Database-driven field configuration| Teknik Elektro | `elektro` | `templates/elektro/kkp.docx` | - |

- ✅ **Dynamic Field Management** - Database-driven field configuration

- ✅ **Document Versioning** - Track document versions and changes- ✅ **Document Versioning** - Track document versions and changes| Arsitektur | `arsitektur` | `templates/arsitektur/kkp.docx` | - |

- ✅ **Multi-Signature Workflow** - Support for multiple signers per document

- ✅ **Multi-Signature Workflow** - Support for multiple signers per document| Perencanaan Wilayah & Kota | `pwk` | `templates/pwk/kkp.docx` | - |

### Security Features

### Security Features---

- 🔐 **EdDSA Digital Signatures** - Military-grade cryptography (Ed25519)

- 🔐 **SHA-256 Hashing** - Document integrity verification- 🔐 **EdDSA Digital Signatures** - Military-grade cryptography

- 🔐 **AES-256-GCM Encryption** - Private key protection

- 🔐 **Audit Trail** - Complete activity logging- 🔐 **SHA-256 Hashing** - Document integrity verification## 🏗️ **Struktur Proyek**

- 🔐 **Rate Limiting** - API abuse prevention

- 🔐 **Input Validation** - Comprehensive request validation- 🔐 **AES-256-GCM Encryption** - Private key protection

### Developer Features- 🔐 **Audit Trail** - Complete activity logging```

- 🎯 **Clean Architecture** - Clear separation of concerns- 🔐 **Rate Limiting** - API abuse preventiongenerate-document-api/

- 🎯 **Repository Pattern** - Abstracted data access layer

- 🎯 **Service Layer** - Reusable business logic├── api/ # API utilities dan integrations

- 🎯 **API Versioning** - Support for multiple API versions (v1)

- 🎯 **Comprehensive Testing** - Unit, integration, and E2E tests### Developer Features│ └── index.js

- 🎯 **Code Quality Tools** - ESLint, Prettier, Nodemon

- 🎯 **Winston Logging** - Structured logging with file rotation- 🎯 **Clean Architecture** - Separation of concerns├── auth/ # Authentication & validation

- 🎯 **API Documentation** - Built-in API documentation endpoint

- 🎯 **Repository Pattern** - Abstracted data access│ └── index.js

### Supported Program Studi

- 🎯 **Service Layer** - Reusable business logic├── controllers/ # Request handlers

| Prodi | Code | Template Path | Status |

|-------|------|---------------|--------|- 🎯 **API Versioning** - Support for multiple API versions│ └── index.js

| Teknik Informatika | `informatika` | `templates/informatika/kkp.docx` | ✅ Active |

| Teknik Elektro | `elektro` | `templates/elektro/kkp.docx` | ✅ Active |- 🎯 **Comprehensive Testing** - Unit, integration, and E2E tests├── prisma/ # Database configuration

| Arsitektur | `arsitektur` | `templates/arsitektur/kkp.docx` | ✅ Active |

| Teknik Pengairan | `pengairan` | `templates/pengairan/kkp.docx` | ✅ Active |- 🎯 **Code Quality Tools** - ESLint, Prettier│ ├── index.js

| Perencanaan Wilayah & Kota | `pwk` | `templates/pwk/kkp.docx` | ✅ Active |

│ ├── schema.prisma

## 🏗️ Project Structure

## 🏗️ Architecture│ ├── seed.js # Original seeder

`````

generate-document-api/│ ├── seed-documents.js # Dynamic document seeder

├── src/                              # Source code

│   ├── api/v1/                       # API Layer````│ └── migrations/

│   │   ├── controllers/              # Request handlers (3 files)

│   │   ├── middlewares/              # Express middlewares (6 files)src/├── routes/                       # API routes

│   │   └── routes/                   # API routes (4 files)

│   ├── config/                       # Configuration files (5 files)├── api/v1/              # API Layer (Routes, Controllers, Middlewares)│   ├── index.js                  # Main routes

│   │   ├── app.config.js             # Application config

│   │   ├── database.config.js        # Database config├── config/              # Configuration files│   └── document-config.js        # Dynamic field endpoints

│   │   ├── storage.config.js         # Storage config

│   │   ├── signature.config.js       # Signature config├── core/                # Business Logic├── services/                     # Business logic

│   │   └── index.js                  # Config exports

│   ├── core/                         # Business Logic│   ├── services/        # Service layer│   ├── index.js

│   │   ├── services/                 # Service layer (6 files)

│   │   │   ├── document/             # Document service│   └── repositories/    # Data access layer│   └── fields.js                 # Dynamic field processing

│   │   │   └── signature/            # Signature services

│   │   └── repositories/             # Data access layer (4 files)├── infrastructure/      # External systems├── session/                      # Session management

│   │       ├── base.repository.js    # Base repository

│   │       ├── document.repository.js│   ├── database/        # Prisma & PostgreSQL│   └── index.js

│   │       ├── signature.repository.js

│   │       └── signer.repository.js│   └── storage/         # File storage├── templates/                    # Document templates per prodi

│   ├── infrastructure/               # External Systems

│   │   ├── database/                 # Database└── shared/              # Shared utilities│   ├── informatika/kkp.docx

│   │   │   └── prisma/

│   │   │       ├── schema.prisma     # Prisma schema    ├── utils/           # Utility functions│   ├── elektro/kkp.docx

│   │   │       ├── client.js         # Prisma client singleton

│   │   │       ├── migrations/       # Database migrations    ├── helpers/         # Helper functions│   ├── arsitektur/kkp.docx

│   │   │       └── seeds/            # Seed files

│   │   └── storage/                  # File storage    └── constants/       # Constants & enums│   ├── pengairan/kkp.docx

│   │       └── local.storage.js      # Local storage service

│   ├── shared/                       # Shared Components```│   ├── pwk/kkp.docx

│   │   ├── utils/                    # Utilities (5 files)

│   │   │   ├── logger.util.js        # Winston logger│   ├── output/                   # Generated documents

│   │   │   ├── crypto.util.js        # Crypto utilities

│   │   │   ├── date.util.js          # Date utilitiesSee [System Architecture](docs/architecture/system-design.md) for detailed information.│   └── qr-code/                  # QR code assets

│   │   │   └── file.util.js          # File utilities

│   │   ├── helpers/                  # Helpers (5 files)├── test/                         # Testing suite

│   │   │   ├── document.helper.js

│   │   │   ├── qrcode.helper.js## 📋 Prerequisites│   └── test-dynamic-fields.js

│   │   │   ├── validation.helper.js

│   │   │   └── response.helper.js├── utils/                        # Utility functions

│   │   └── constants/                # Constants (5 files)

│   │       ├── status-codes.js- **Node.js** v18.0.0 or higher│   ├── generate-date.js          # Date processing

│   │       ├── error-codes.js

│   │       ├── roles.js- **PostgreSQL** v14.0 or higher│   ├── generate-document.js      # Document generation

│   │       └── status.js

│   └── app.js                        # Express app setup- **npm** v9.0.0 or higher│   ├── generate-fields.js        # 🆕 Dynamic field generation

├── storage/                          # File Storage

│   ├── outputs/                      # Generated documents│   └── generate-qrcode.js        # QR code generation

│   ├── qrcodes/                      # QR code images

│   ├── signatures/                   # Signature images## 🚀 Quick Start├── package.json

│   └── uploads/                      # Uploaded files

├── templates/                        # Document Templates├── server.js                     # Main server

│   ├── informatika/

│   ├── elektro/### 1. Clone & Install├── .env                          # Environment variables

│   ├── arsitektur/

│   ├── pengairan/└── readme.md

│   └── pwk/

├── tests/                            # Test Files```bash```

│   ├── unit/

│   ├── integration/git clone https://github.com/devnolife/documet-template.git

│   └── e2e/

├── docs/                             # Documentationcd generate-document-api---

│   ├── api/

│   ├── architecture/npm install

│   └── guides/

├── logs/                             # Application Logs```## 🚀 **Instalasi & Setup**

│   ├── error.log

│   └── combined.log

├── .vscode/                          # VS Code Settings

├── server.js                         # Entry Point### 2. Environment Setup### 1️⃣ Clone Repository

├── package.json

└── README.md

`````

`bash`bash

## 🛠️ Available Scripts

cp .env.example .envgit clone https://github.com/devnolife/generate-document-api.git

### Development

# Edit .env with your configurationcd generate-document-api

`````bash

npm run dev          # Start with nodemon (auto-reload)````

npm run dev:watch    # Start with Node.js --watch flag

npm start            # Start production server### 3. Database Setup### 2️⃣ Instalasi Dependencies

`````

`bash`bash

### Code Quality

npm run prisma:generatenpm install

````````bash

npm run lint         # Run ESLintnpm run prisma:migrate```

npm run lint:fix     # Fix ESLint issues

npm run format       # Format code with Prettiernpm run seed

npm run format:check # Check code formatting

```````**Main Dependencies:**



### Testing- `express` - Web framework



```bash### 4. Start Development Server- `@prisma/client` - Database ORM client

npm test                 # Run all tests

npm run test:unit        # Run unit tests- `prisma` - Database toolkit

npm run test:integration # Run integration tests

npm run test:e2e         # Run E2E tests```bash- `docxtemplater` - Document template engine

npm run test:coverage    # Generate coverage report

npm run test:watch       # Run tests in watch modenpm run dev- `docxtemplater-image-module-free` - Image module for docx

````````

```- `moment`&`moment-hijri` - Date processing

### Database

- `qrcode` - QR code generation

```bash

npm run prisma:generate      # Generate Prisma clientServer will start at `http://localhost:8080`- `cors` - Cross-origin resource sharing

npm run prisma:migrate       # Run migrations

npm run prisma:migrate:prod  # Deploy migrations to production

npm run prisma:studio        # Open Prisma Studio

npm run prisma:reset         # Reset databaseSee [Installation Guide](docs/guides/installation.md) for detailed setup instructions.### 3️⃣ Konfigurasi Database

npm run db:push              # Push schema changes

npm run db:seed              # Seed database

```

## 📚 DocumentationBuat file `.env` di direktori root:

### Maintenance

````bash

npm run clean            # Clean node_modules and cache- [Installation Guide](docs/guides/installation.md) - Complete setup instructions```env

npm run clean:storage    # Clean storage directories

```- [System Architecture](docs/architecture/system-design.md) - Architecture overviewDATABASE_URL="postgresql://username:password@localhost:5432/generate_document_db"



## 🔌 API Endpoints- [Security Documentation](docs/architecture/security.md) - Security implementation```



### Documents- [API Documentation](docs/api/) - API endpoints and usage



```### 4️⃣ Setup Database

POST   /api/v1/documents/generate         # Generate document

GET    /api/v1/documents                  # List documents## 🎨 Project Structure (New)

GET    /api/v1/documents/:id              # Get document by ID

GET    /api/v1/documents/:id/download     # Download document```bash

GET    /api/v1/documents/:id/verify       # Verify document

PATCH  /api/v1/documents/:id              # Update document (Admin)```# Generate Prisma Client

DELETE /api/v1/documents/:id              # Delete document (Admin)

GET    /api/v1/documents/types            # List document typesgenerate-document-api/npx prisma generate

GET    /api/v1/documents/config/:type/:prodi  # Get document config

```├── src/                              # Source code



### Signatures│   ├── api/v1/                       # API version 1# Run database migrations



```│   │   ├── controllers/              # Request handlersnpx prisma migrate dev

POST   /api/v1/signatures/sign            # Sign document

GET    /api/v1/signatures/verify/:docId   # Verify signatures│   │   ├── routes/                   # API routes

GET    /api/v1/signatures/document/:docId # Get document signatures

GET    /api/v1/signatures/:id             # Get signature by ID│   │   ├── middlewares/              # Middlewares# Seed database dengan data dokumen dinamis

POST   /api/v1/signatures/qrcode          # Generate QR code

GET    /api/v1/signatures/logs/:docId     # Get verification logs (Admin)│   │   └── validators/               # Request validatorsnode prisma/seed-documents.js

POST   /api/v1/signatures/:id/revoke      # Revoke signature (Admin)

```│   ├── config/                       # Configuration```



### Signers│   │   ├── app.config.js



```│   │   ├── database.config.js### 5️⃣ Jalankan Server

POST   /api/v1/signatures/signers         # Create signer (Admin)

GET    /api/v1/signatures/signers         # List signers│   │   ├── storage.config.js

GET    /api/v1/signatures/signers/:id     # Get signer by ID

GET    /api/v1/signatures/signers/nbm/:nbm  # Get signer by NBM│   │   └── signature.config.js```bash

PATCH  /api/v1/signatures/signers/:id     # Update signer (Admin)

POST   /api/v1/signatures/signers/:id/deactivate  # Deactivate signer (Admin)│   ├── core/                         # Business logicnpm run dev

POST   /api/v1/signatures/signers/:id/rotate-keys  # Rotate keys (Admin)

```│   │   ├── services/                 # Service layer```



### Admin│   │   │   ├── document/



```│   │   │   ├── signature/Server akan berjalan di **http://localhost:8080**

GET    /api/v1/admin/statistics           # Get statistics (Admin)

GET    /api/v1/admin/activities           # Get recent activities (Admin)│   │   │   ├── notification/

GET    /api/v1/admin/audit-logs           # Get audit logs (Admin)

GET    /api/v1/admin/health                # System health (Admin)│   │   │   └── audit/---

GET    /api/v1/admin/documents/by-prodi   # Documents by prodi (Admin)

GET    /api/v1/admin/documents/by-type    # Documents by type (Admin)│   │   └── repositories/             # Data access

POST   /api/v1/admin/cleanup               # Cleanup old files (Admin)

GET    /api/v1/admin/export                # Export data (Admin)│   │       ├── document.repository.js## 🗄️ **Database Schema**

````

│ │ ├── signature.repository.js

**Total: 34+ endpoints**

│ │ └── signer.repository.js### **Table: documents**

See [API Documentation](docs/guides/api-usage.md) for detailed endpoint information.

│ ├── infrastructure/ # InfrastructureMenyimpan konfigurasi tipe dokumen untuk setiap prodi.

## ⚠️ Common Issues & Solutions

│ │ ├── database/

### Port Already in Use

│ │ │ └── prisma/| Column | Type | Description |

**Windows:**

│ │ │ ├── schema.prisma|--------|------|-------------|

````bash

netstat -ano | findstr :8080│   │   │       ├── client.js| id | int | Primary key |

taskkill /PID <PID> /F

```│   │   │       └── seeds/| type | string | Jenis dokumen (kkp, surat_tugas, etc) |



**Linux/Mac:**│   │   └── storage/| prodi | string | Kode program studi |



```bash│   │       └── local.storage.js| template_path | string | Path ke template .docx |

lsof -ti:8080 | xargs kill -9

```│   └── shared/                       # Shared components| description | text | Deskripsi dokumen |



### Database Connection Error│       ├── utils/                    # Utilities| created_at | timestamp | Waktu dibuat |



1. Check PostgreSQL is running│       │   ├── logger.util.js

2. Verify `DATABASE_URL` in `.env`

3. Test connection: `npx prisma db pull`│       │   ├── date.util.js**Unique constraint:** `(type, prodi)` - Satu prodi hanya punya satu template per tipe dokumen.



### Template Not Found│       │   ├── crypto.util.js



1. Ensure template exists: `templates/informatika/kkp.docx`│       │   └── file.util.js### **Table: document_fields**

2. Check file permissions

3. Verify prodi and type parameters│       ├── helpers/                  # HelpersMenyimpan konfigurasi field untuk setiap dokumen.



### Module Not Found│       │   ├── document.helper.js



```bash│       │   ├── qrcode.helper.js| Column | Type | Description |

# Reinstall dependencies

rm -rf node_modules package-lock.json│       │   ├── validation.helper.js|--------|------|-------------|

npm install

```│       │   └── response.helper.js| id | int | Primary key |



## 🏗️ Architecture│       └── constants/                # Constants| document_id | int | FK ke documents |



### Clean Architecture Pattern│           ├── status-codes.js| field_name | string | Nama field (kepada, tempat_tujuan, etc) |



```│           ├── error-codes.js| field_type | string | Tipe field (string, date_hijriyah, table, etc) |

┌──────────────────────────────────────────────────────────┐

│                     API Layer (v1)                       ││           ├── roles.js| is_required | boolean | Apakah field wajib diisi |

│  Routes → Middlewares → Controllers                      │

└────────────────────┬─────────────────────────────────────┘│           └── status.js| default_value | text | Nilai default field |

                     │

┌────────────────────▼─────────────────────────────────────┐├── storage/                          # Storage directory| created_at | timestamp | Waktu dibuat |

│                   Core Layer                             │

│  Services → Repositories                                 ││   ├── templates/                    # Document templates

└────────────────────┬─────────────────────────────────────┘

                     ││   ├── outputs/                      # Generated documents---

┌────────────────────▼─────────────────────────────────────┐

│                Infrastructure Layer                       ││   ├── uploads/                      # Uploaded files

│  Database (Prisma) → Storage (Local)                     │

└────────────────────┬─────────────────────────────────────┘│   ├── qrcodes/                      # QR code images## 🎨 **Field Types yang Didukung**

                     │

┌────────────────────▼─────────────────────────────────────┐│   └── signatures/                   # Signature images

│                   Shared Layer                           │

│  Utils → Helpers → Constants                             │├── tests/                            # TestsSistem mendukung berbagai tipe field dengan processing yang sesuai:

└──────────────────────────────────────────────────────────┘

```│   ├── unit/



### Request Flow│   ├── integration/| Field Type | Description | Contoh Input | Output |



```│   └── e2e/|------------|-------------|--------------|--------|

Client Request

     ↓├── docs/                             # Documentation| `string` | Text biasa | "PT. Tech Indonesia" | "PT. Tech Indonesia" |

Express Router (routes/)

     ↓│   ├── api/| `text` | Text panjang | "Deskripsi proyek..." | "Deskripsi proyek..." |

Middleware Stack (validation, auth, rate-limit)

     ↓│   ├── architecture/| `date_hijriyah` | Tanggal Hijriyah | "1445/06/15" | "15 Jumadil Akhir 1445 H" |

Controller (request handling)

     ↓│   └── guides/| `date_masehi` | Tanggal Masehi | "2024-01-15" | "2024-01-15" |

Service Layer (business logic)

     ↓├── .eslintrc.js                      # ESLint config| `table` | Array data mahasiswa | `[{nama, nim, semester}]` | `[{no: 1, nama, nim, semester}]` |

Repository Layer (data access)

     ↓├── .prettierrc                       # Prettier config| `array` | Array umum | `["item1", "item2"]` | `["item1", "item2"]` |

Prisma Client

     ↓├── jest.config.js                    # Jest config| `number` | Angka | 123 | 123 |

PostgreSQL Database

```├── nodemon.json                      # Nodemon config| `boolean` | True/False | true | true |



### Key Design Patterns└── server.js                         # Entry point



- **Repository Pattern** - Data access abstraction```---

- **Service Layer Pattern** - Business logic encapsulation

- **Singleton Pattern** - Database connection, Logger

- **Factory Pattern** - QR Code generation, Document generation

- **Middleware Pattern** - Express middlewares## 🛠️ Available Scripts## 🛠️ **API Endpoints**



See [System Architecture](docs/architecture/system-design.md) for detailed information.



## 🔐 Security### Development### **🔹 Generate Document (Multi-Prodi)**



### Implemented Security Measures```bash



1. **Digital Signatures**npm run dev              # Start development server with auto-reload#### `POST /api/generate-document/{type}/{prodi}`

   - EdDSA (Ed25519) for document signing

   - Public/Private key cryptographynpm run dev:watch        # Start with Node.js --watch flagGenerate dokumen dengan prodi spesifik.

   - Signature verification workflow

npm start                # Start production server

2. **Data Protection**

   - SHA-256 hashing for document integrity```**Example Request:**

   - AES-256-GCM encryption for private keys

   - Secure key storage and rotation```bash



3. **API Security**### DatabasePOST /api/generate-document/kkp/informatika

   - Rate limiting (100-30 req/15min depending on endpoint)

   - JWT authentication (planned)```bashContent-Type: application/json

   - Input validation and sanitization

   - CORS configurationnpm run prisma:generate  # Generate Prisma Client



4. **Audit & Monitoring**npm run prisma:migrate   # Run migrations{

   - Complete audit trail

   - Verification logsnpm run prisma:studio    # Open Prisma Studio  "kepada": "PT. Tech Indonesia",

   - Activity tracking

   - Winston structured loggingnpm run prisma:reset     # Reset database  "tempat_tujuan": "Jakarta",



See [Security Documentation](docs/architecture/security.md) for details.npm run seed             # Seed database  "tanggal_hijriyah": "1445/06/15",



## 🧪 Testing```  "tanggal_masehi": "2024-01-15",



### Test Structure  "tableData": [



```bash### Code Quality    {

tests/

├── unit/              # Unit tests for services, utilities```bash      "nama": "Ahmad Rahman",

├── integration/       # Integration tests for API endpoints

└── e2e/              # End-to-end tests for workflowsnpm run lint             # Lint code      "nim": "2019001",

````

npm run lint:fix # Lint and fix code "semester": "6"

### Running Tests

npm run format # Format code with Prettier }

`````bash

# Run all testsnpm run format:check     # Check code formatting  ]

npm test

```}

# Run specific test suite

npm run test:unit````

npm run test:integration

npm run test:e2e### Testing



# Watch mode````bash**Response:**

npm run test:watch

npm test                 # Run all tests```json

# Coverage report

npm run test:coveragenpm run test:unit        # Run unit tests{

`````

npm run test:integration # Run integration tests "success": true,

## 📊 Database Schema

npm run test:e2e # Run E2E tests "data": {

### Core Tables

npm run test:coverage # Generate coverage report "filePath": "/path/to/informatika_kkp_1694168876543.docx",

- **`documents`** - Document configurations per prodi

- **`document_fields`** - Dynamic field definitionsnpm run test:watch # Run tests in watch mode "no_surat": "001/KKP/2024",

- **`signers`** - Registered signers with EdDSA keys

- **`document_signatures`** - Individual signatures``` "prodi": "informatika",

- **`verification_logs`** - Verification attempts

- **`audit_logs`** - System audit trail "message": "Dokumen KKP untuk prodi informatika berhasil dibuat"

### Key Relationships### Maintenance }

`````bash}

documents (1) ←→ (N) document_fields

documents (1) ←→ (N) document_signaturesnpm run clean            # Clean node_modules and cache```

signers (1) ←→ (N) document_signatures

```npm run clean:storage    # Clean storage directories



## 📚 Documentation```### **🔹 Dynamic Field Configuration**



- **[Quick Start Guide](QUICKSTART.md)** - Fast setup and first API call

- **[Installation Guide](docs/guides/installation.md)** - Complete setup instructions

- **[API Usage Guide](docs/guides/api-usage.md)** - API endpoints and examples## 🔌 API Endpoints#### `GET /api/document-config/types`

- **[Migration Guide](docs/guides/migration.md)** - Migration from old structure

- **[System Architecture](docs/architecture/system-design.md)** - Architecture overviewMendapatkan semua tipe dokumen yang tersedia.

- **[Security Documentation](docs/architecture/security.md)** - Security implementation

- **[Cleanup Summary](docs/CLEANUP_SUMMARY.md)** - Project restructuring details### Documents



## 🤝 Contributing```**Response:**



Contributions are welcome! Please follow these steps:POST   /api/v1/documents/generate         # Generate document```json



1. Fork the repositoryGET    /api/v1/documents/:id              # Get document{

2. Create your feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add: amazing feature'`)GET    /api/v1/documents                  # List documents  "success": true,

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull RequestDELETE /api/v1/documents/:id              # Delete document  "data": {



### Coding Standards```    "kkp": [



- Use **camelCase** for variables and functions      {

- Use **async/await** for asynchronous operations

- Include **error handling** in all functions### Signatures        "prodi": "informatika",

- Add **comments** for complex business logic

- **Test** endpoints before commit```        "description": "Template surat KKP untuk Program Studi Informatika",

- Follow **ESLint** and **Prettier** rules

POST   /api/v1/signatures/sign            # Sign document        "template_path": "templates/informatika/kkp.docx"

## 📝 Code Style

POST   /api/v1/signatures/verify          # Verify signature      },

This project uses:

GET    /api/v1/signatures/:docId          # Get document signatures      {

- **ESLint** for code linting

- **Prettier** for code formatting```        "prodi": "elektro",

- **Conventional Commits** for commit messages

        "description": "Template surat KKP untuk Program Studi Teknik Elektro",

```bash

# Check code style### Admin        "template_path": "templates/elektro/kkp.docx"

npm run lint

npm run format:check```      }



# Fix code styleGET    /api/v1/admin/signers              # List signers    ]

npm run lint:fix

npm run formatPOST   /api/v1/admin/signers              # Create signer  }

```

PUT    /api/v1/admin/signers/:id          # Update signer}

## 🛣️ Roadmap

DELETE /api/v1/admin/signers/:id          # Delete signer```

### Planned Features

````

- [ ] JWT Authentication implementation

- [ ] Web-based template editor#### `GET /api/document-config/fields/{type}?prodi=xxx`

- [ ] Field validation based on field_type

- [ ] Template versioning systemSee [API Documentation](docs/api/) for complete endpoint details.Mendapatkan field yang tersedia untuk tipe dokumen tertentu.

- [ ] Batch document generation

- [ ] Document preview before generation## 🔐 Security**Response:**

- [ ] Advanced field types (dropdown, multiselect)

- [ ] Template inheritance system````json

- [ ] Real-time document status tracking

- **EdDSA (Ed25519)** for digital signatures{

### Performance Improvements

- **SHA-256** for document hashing  "success": true,

- [ ] Template caching system

- [ ] Background job processing for bulk generation- **AES-256-GCM** for private key encryption  "data": [

- [ ] CDN integration for template storage

- [ ] Redis caching for metadata- **Rate limiting** to prevent API abuse    {

- [ ] Database query optimization

- **Input validation** at middleware level      "id": 1,

## 📄 License

- **Comprehensive audit logging**      "type": "kkp",

This project is licensed under the ISC License.

      "prodi": "informatika",

## 👥 Author

See [Security Documentation](docs/architecture/security.md) for details.      "template_path": "templates/informatika/kkp.docx",

**devnolife**

      "description": "Template surat KKP untuk Program Studi Informatika",

- GitHub: [@devnolife](https://github.com/devnolife)

- Repository: [documet-template](https://github.com/devnolife/documet-template)## 🧪 Testing      "fields": [



## 🙏 Acknowledgments        {



- Express.js team```bash          "field_name": "kepada",

- Prisma team

- Docxtemplater contributors# Run all tests          "field_type": "string",

- All open-source contributors

npm test          "is_required": true,

## 📞 Support

          "default_value": null

- **Documentation:** [/api/docs](http://localhost:8080/api/docs)

- **Health Check:** [/api/v1/health](http://localhost:8080/api/v1/health)# Run with coverage        },

- **Issues:** [GitHub Issues](https://github.com/devnolife/documet-template/issues)

- **Discussions:** [GitHub Discussions](https://github.com/devnolife/documet-template/discussions)npm run test:coverage        {



---          "field_name": "nama_prodi",



<div align="center"># Run specific test suite          "field_type": "string",



**⭐ If you find this project useful, please give it a star! ⭐**npm run test:unit          "is_required": false,



Built with ❤️ by [devnolife](https://github.com/devnolife)npm run test:integration          "default_value": "Informatika"



</div>npm run test:e2e        },


```        {

          "field_name": "tableData",

## 📊 Database Schema          "field_type": "table",

          "is_required": true,

Key tables:          "default_value": null

- `documents` - Document configurations        }

- `document_fields` - Dynamic field definitions      ]

- `signers` - Registered signers with EdDSA keys    }

- `signed_documents` - Signed document records  ]

- `document_signatures` - Individual signatures}

- `verification_logs` - Verification attempts```

- `audit_logs` - System audit trail

#### `POST /api/document-config/generate/{type}/{prodi}`

See [Database Schema](docs/architecture/database-schema.md) for complete schema.Test endpoint untuk generate fields (debugging).



## 🤝 Contributing### **🔹 Legacy Endpoints (Backward Compatible)**



Contributions are welcome! Please follow these steps:#### `GET /api/templates`

Mendapatkan daftar semua template yang tersedia.

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/amazing-feature`)#### `GET /api/templates/{type}/{prodi}/fields`

3. Commit your changes (`git commit -m 'Add amazing feature'`)Mendapatkan field yang diperlukan untuk template tertentu.

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request#### `POST /api/generate-document/{type}`

Generate dokumen (default ke prodi informatika).

## 📝 Code Style

---

This project uses:

- **ESLint** for code linting## 🧪 **Testing & Development**

- **Prettier** for code formatting

- **Conventional Commits** for commit messages### **Manual Testing**

Jalankan test suite untuk memastikan sistem berfungsi:

## 📄 License

```bash

This project is licensed under the ISC License.node test/test-dynamic-fields.js

````

## 👥 Author

### **API Testing Commands**

**devnolife**

- GitHub: [@devnolife](https://github.com/devnolife)```bash

- Repository: [documet-template](https://github.com/devnolife/documet-template)# 1. Get all document types

curl -X GET "http://localhost:8080/api/document-config/types"

## 🙏 Acknowledgments

# 2. Get fields for KKP Informatika

- Express.js teamcurl -X GET "http://localhost:8080/api/document-config/fields/kkp?prodi=informatika"

- Prisma team

- Docxtemplater contributors# 3. Generate KKP document for Elektro

- All open-source contributorscurl -X POST "http://localhost:8080/api/generate-document/kkp/elektro" \

  -H "Content-Type: application/json" \

## 📞 Support -d '{

    "kepada": "PLN Indonesia",

- Documentation: [/docs](docs/) "tempat_tujuan": "Bandung",

- Issues: [GitHub Issues](https://github.com/devnolife/documet-template/issues) "tableData": [

- Discussions: [GitHub Discussions](https://github.com/devnolife/documet-template/discussions) {"nama": "John Doe", "nim": "2019003", "semester": "6"}

  ]

--- }'

**⭐ If you find this project useful, please give it a star!**# 4. Get templates list

curl -X GET "http://localhost:8080/api/templates"

# 5. Get required fields for specific template

curl -X GET "http://localhost:8080/api/templates/kkp/arsitektur/fields"

````

---

## 🔧 **System Architecture**

### **🆕 Dynamic Field System**
Sistem baru menggunakan pendekatan database-driven untuk konfigurasi field:

**Sebelum (Hardcoded):**
```javascript
switch (type) {
  case 'kkp':
    return { kepada, tempat_tujuan, nama_prodi, ... };
}
````

**Sesudah (Dynamic dari Database):**

```javascript
const document = await prisma.documents.findFirst({
  where: { type, prodi },
  include: { document_fields: true },
});

// Process fields berdasarkan field_type dari database
for (const field of document.document_fields) {
  // Dynamic field processing
}
```

### **Core Functions**

#### `generateFields(type, prodi, body)`

Generate fields berdasarkan konfigurasi database.

```javascript
const result = await generateFields('kkp', 'informatika', {
  kepada: 'PT. Tech',
  tableData: [{ nama: 'John', nim: '123' }],
});
```

#### `getAvailableFields(type, prodi?)`

Mendapatkan daftar field yang tersedia.

```javascript
const fields = await getAvailableFields('kkp', 'informatika');
```

#### `getAllDocumentTypes()`

Mendapatkan semua tipe dokumen yang tersedia.

```javascript
const types = await getAllDocumentTypes();
```

---

## 🚀 **Menambah Tipe Dokumen Baru**

Untuk menambahkan tipe dokumen atau prodi baru:

### 1️⃣ Tambah Data ke Database

```javascript
// Tambahkan ke seed file atau manual via Prisma
await prisma.documents.create({
  data: {
    type: 'surat_tugas',
    prodi: 'informatika',
    template_path: 'templates/informatika/surat_tugas.docx',
    description: 'Surat Tugas Informatika',
    document_fields: {
      create: [
        {
          field_name: 'nama_pembimbing',
          field_type: 'string',
          is_required: true,
        },
        {
          field_name: 'lokasi_tugas',
          field_type: 'string',
          is_required: true,
        },
      ],
    },
  },
});
```

### 2️⃣ Upload Template File

Upload file template ke `templates/informatika/surat_tugas.docx`

### 3️⃣ Test API

Sistem otomatis mendeteksi konfigurasi baru tanpa perlu mengubah kode!

```bash
curl -X GET "http://localhost:8080/api/document-config/fields/surat_tugas?prodi=informatika"
```

---

## 🎯 **Benefits Sistem Baru**

### ✅ **Fleksibilitas**

- Mudah menambah field baru tanpa ubah kode
- Support multiple prodi dengan konfigurasi berbeda
- Konfigurasi terpusat di database

### ✅ **Skalabilitas**

- Mudah menambah prodi baru
- Support berbagai tipe dokumen
- Template path dinamis per prodi

### ✅ **Maintainability**

- Konfigurasi terpisah dari business logic
- Field processing berdasarkan tipe data
- Include metadata untuk setiap dokumen

### ✅ **Backward Compatibility**

- Endpoint lama masih berfungsi
- Migration bertahap dari sistem lama

---

## 🛠️ **Dependencies**

### **Production Dependencies**

- **Express.js** - Web framework untuk Node.js
- **Prisma** - Database ORM dan toolkit
- **Docxtemplater** - Template engine untuk dokumen .docx
- **Docxtemplater Image Module** - Module untuk insert gambar/QR
- **Moment.js** - Date/time processing library
- **Moment Hijri** - Hijri calendar support
- **QRCode** - QR code generation
- **Form-Data** - Multipart form data handling
- **CORS** - Cross-origin resource sharing
- **PizZip** - ZIP file processing untuk docx
- **Jimp** - Image processing
- **FS-Extra** - Enhanced file system utilities

### **Development Dependencies**

- **Prisma CLI** - Database schema management

---

## 🔑 **Scripts**

```bash
npm run dev          # Jalankan server dalam mode development dengan watch
npm run seed         # Jalankan original seeder
npm test             # Jalankan test suite (belum diimplementasi)
```

**Custom Commands:**

```bash
node prisma/seed-documents.js           # Seed dynamic document configuration
node test/test-dynamic-fields.js        # Test dynamic field system
npx prisma studio                       # Open Prisma Studio untuk manage data
npx prisma migrate dev                  # Jalankan database migrations
```

---

## 🔍 **Utilities & Services**

### **Utils:**

- **`generate-date.js`** - Date processing (Hijri & Masehi)
- **`generate-document.js`** - Document generation dengan Docxtemplater
- **`generate-fields.js`** - 🆕 Dynamic field processing dari database
- **`generate-qrcode.js`** - QR code generation dengan image

### **Services:**

- **`fields.js`** - Business logic untuk field processing
- **`index.js`** - Main document service

### **Controllers:**

- **`index.js`** - Request handlers untuk semua endpoints

### **Routes:**

- **`index.js`** - Main API routes
- **`document-config.js`** - 🆕 Dynamic field configuration endpoints

---

## 🔐 **Environment Variables**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/generate_document_db"

# Server (optional)
PORT=8080
NODE_ENV=development

# API Integrations (optional)
WHATSAPP_API_URL="https://whatsapp.devnolife.site"
FILE_UPLOAD_API_URL="https://api.devnolife.site"
SURAT_NUMBER_API_URL="https://devnolife.site/api/no-surat"
```

---

## 📊 **Performance & Monitoring**

### **Database Queries**

- Menggunakan Prisma untuk optimized queries
- Include relations untuk mengurangi N+1 queries
- Database indexing pada unique constraints

### **File Processing**

- Template caching untuk performa
- Efficient document generation dengan stream processing
- QR code generation dengan image optimization

---

## 🤝 **Contributing**

Kontribusi sangat diterima! Ikuti langkah berikut:

### **Development Workflow:**

1. Fork repository
2. Create feature branch: `git checkout -b feature/nama-fitur`
3. Make changes dan test
4. Commit changes: `git commit -m 'Add: deskripsi fitur'`
5. Push ke branch: `git push origin feature/nama-fitur`
6. Create Pull Request

### **Coding Standards:**

- Gunakan camelCase untuk variables dan functions
- Gunakan async/await untuk asynchronous operations
- Include error handling di semua functions
- Add comments untuk business logic yang kompleks
- Test endpoints sebelum commit

---

## 🐛 **Troubleshooting**

### **Common Issues:**

**Database Connection Error:**

```bash
# Check DATABASE_URL format
# Ensure PostgreSQL is running
# Check network connectivity
```

**Template Not Found:**

```bash
# Check file exists di templates/{prodi}/{type}.docx
# Verify template_path di database
# Check file permissions
```

**Field Not Recognized:**

```bash
# Check field configuration di database
# Verify field_name spelling
# Check field_type support
```

**Document Generation Failed:**

```bash
# Check template syntax (Docxtemplater format)
# Verify data format matches field requirements
# Check QR code generation dependencies
```

---

## 📋 **Roadmap**

### **Planned Features:**

- [ ] Web-based template editor
- [ ] Field validation berdasarkan field_type
- [ ] Template versioning system
- [ ] Batch document generation
- [ ] Document preview sebelum generate
- [ ] Advanced field types (dropdown, multiselect)
- [ ] Template inheritance system
- [ ] Audit logging untuk document generation

### **Performance Improvements:**

- [ ] Template caching system
- [ ] Background job processing untuk bulk generation
- [ ] CDN integration untuk template storage
- [ ] Redis caching untuk metadata

---

## 📜 **License**

Proyek ini dilisensikan di bawah **ISC License**.

---

## 📞 **Support & Contact**

**Developer:** devnolife
**Repository:** [github.com/devnolife/generate-document-api](https://github.com/devnolife/generate-document-api)

Untuk bug report atau feature request, silakan buat issue di GitHub repository.

---

**🎉 Generate Document API - Dynamic Multi-Prodi System siap digunakan!**
`````
