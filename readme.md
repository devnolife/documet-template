# 📄 Generate Document API - Modern Architecture# 📄 **Generate Document API - Dynamic Multi-Prodi System**

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)Dibuat oleh **devnolife**

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/devnolife/documet-template/pulls)## 📌 **Deskripsi**

> **Modern, Secure, and Scalable Document Generation API with Digital Signature Support**Generate Document API adalah aplikasi berbasis Node.js yang memungkinkan pengguna untuk menghasilkan dokumen berdasarkan template yang telah ditentukan. Aplikasi ini menggunakan **Express.js** sebagai server, **Prisma** untuk interaksi database, dan **Docxtemplater** untuk pembuatan dokumen.

Developed by **devnolife**### 🆕 **Fitur Terbaru: Dynamic Field Detection**

Sistem terbaru menggunakan **deteksi field dinamis dari database**, menggantikan sistem hardcoded sebelumnya. Setiap program studi dapat memiliki template dan field yang berbeda-beda, dan konfigurasi disimpan di database.

## 🌟 Features

### 📋 **Supported Prodi**

### Core Features

- ✅ **Dynamic Document Generation** - Template-based document generation using Docxtemplater| Prodi | Code | Template Path | Fields Khusus |

- ✅ **Multi-Program Studi Support** - Informatika, Elektro, Arsitektur, Pengairan, PWK|-------|------|---------------|---------------|

- ✅ **Digital Signature (EdDSA)** - Ed25519 cryptographic signatures| Teknik Informatika | `informatika` | `templates/informatika/kkp.docx` | - |

- ✅ **QR Code Verification** - Embedded QR codes for document authenticity| Teknik Pengairan | `pengairan` | `templates/pengairan/kkp.docx` | - |

- ✅ **Dynamic Field Management** - Database-driven field configuration| Teknik Elektro | `elektro` | `templates/elektro/kkp.docx` | - |

- ✅ **Document Versioning** - Track document versions and changes| Arsitektur | `arsitektur` | `templates/arsitektur/kkp.docx` | - |

- ✅ **Multi-Signature Workflow** - Support for multiple signers per document| Perencanaan Wilayah & Kota | `pwk` | `templates/pwk/kkp.docx` | - |

### Security Features---

- 🔐 **EdDSA Digital Signatures** - Military-grade cryptography

- 🔐 **SHA-256 Hashing** - Document integrity verification## 🏗️ **Struktur Proyek**

- 🔐 **AES-256-GCM Encryption** - Private key protection

- 🔐 **Audit Trail** - Complete activity logging```

- 🔐 **Rate Limiting** - API abuse preventiongenerate-document-api/

├── api/ # API utilities dan integrations

### Developer Features│ └── index.js

- 🎯 **Clean Architecture** - Separation of concerns├── auth/ # Authentication & validation

- 🎯 **Repository Pattern** - Abstracted data access│ └── index.js

- 🎯 **Service Layer** - Reusable business logic├── controllers/ # Request handlers

- 🎯 **API Versioning** - Support for multiple API versions│ └── index.js

- 🎯 **Comprehensive Testing** - Unit, integration, and E2E tests├── prisma/ # Database configuration

- 🎯 **Code Quality Tools** - ESLint, Prettier│ ├── index.js

│ ├── schema.prisma

## 🏗️ Architecture│ ├── seed.js # Original seeder

│ ├── seed-documents.js # Dynamic document seeder

````│ └── migrations/

src/├── routes/                       # API routes

├── api/v1/              # API Layer (Routes, Controllers, Middlewares)│   ├── index.js                  # Main routes

├── config/              # Configuration files│   └── document-config.js        # Dynamic field endpoints

├── core/                # Business Logic├── services/                     # Business logic

│   ├── services/        # Service layer│   ├── index.js

│   └── repositories/    # Data access layer│   └── fields.js                 # Dynamic field processing

├── infrastructure/      # External systems├── session/                      # Session management

│   ├── database/        # Prisma & PostgreSQL│   └── index.js

│   └── storage/         # File storage├── templates/                    # Document templates per prodi

└── shared/              # Shared utilities│   ├── informatika/kkp.docx

    ├── utils/           # Utility functions│   ├── elektro/kkp.docx

    ├── helpers/         # Helper functions│   ├── arsitektur/kkp.docx

    └── constants/       # Constants & enums│   ├── pengairan/kkp.docx

```│   ├── pwk/kkp.docx

│   ├── output/                   # Generated documents

See [System Architecture](docs/architecture/system-design.md) for detailed information.│   └── qr-code/                  # QR code assets

├── test/                         # Testing suite

## 📋 Prerequisites│   └── test-dynamic-fields.js

├── utils/                        # Utility functions

- **Node.js** v18.0.0 or higher│   ├── generate-date.js          # Date processing

- **PostgreSQL** v14.0 or higher│   ├── generate-document.js      # Document generation

- **npm** v9.0.0 or higher│   ├── generate-fields.js        # 🆕 Dynamic field generation

│   └── generate-qrcode.js        # QR code generation

## 🚀 Quick Start├── package.json

├── server.js                     # Main server

### 1. Clone & Install├── .env                          # Environment variables

└── readme.md

```bash```

git clone https://github.com/devnolife/documet-template.git

cd generate-document-api---

npm install

```## 🚀 **Instalasi & Setup**



### 2. Environment Setup### 1️⃣ Clone Repository



```bash```bash

cp .env.example .envgit clone https://github.com/devnolife/generate-document-api.git

# Edit .env with your configurationcd generate-document-api

````

### 3. Database Setup### 2️⃣ Instalasi Dependencies

`bash`bash

npm run prisma:generatenpm install

npm run prisma:migrate```

npm run seed

````**Main Dependencies:**

- `express` - Web framework

### 4. Start Development Server- `@prisma/client` - Database ORM client

- `prisma` - Database toolkit

```bash- `docxtemplater` - Document template engine

npm run dev- `docxtemplater-image-module-free` - Image module for docx

```- `moment` & `moment-hijri` - Date processing

- `qrcode` - QR code generation

Server will start at `http://localhost:8080`- `cors` - Cross-origin resource sharing



See [Installation Guide](docs/guides/installation.md) for detailed setup instructions.### 3️⃣ Konfigurasi Database



## 📚 DocumentationBuat file `.env` di direktori root:



- [Installation Guide](docs/guides/installation.md) - Complete setup instructions```env

- [System Architecture](docs/architecture/system-design.md) - Architecture overviewDATABASE_URL="postgresql://username:password@localhost:5432/generate_document_db"

- [Security Documentation](docs/architecture/security.md) - Security implementation```

- [API Documentation](docs/api/) - API endpoints and usage

### 4️⃣ Setup Database

## 🎨 Project Structure (New)

```bash

```# Generate Prisma Client

generate-document-api/npx prisma generate

├── src/                              # Source code

│   ├── api/v1/                       # API version 1# Run database migrations

│   │   ├── controllers/              # Request handlersnpx prisma migrate dev

│   │   ├── routes/                   # API routes

│   │   ├── middlewares/              # Middlewares# Seed database dengan data dokumen dinamis

│   │   └── validators/               # Request validatorsnode prisma/seed-documents.js

│   ├── config/                       # Configuration```

│   │   ├── app.config.js

│   │   ├── database.config.js### 5️⃣ Jalankan Server

│   │   ├── storage.config.js

│   │   └── signature.config.js```bash

│   ├── core/                         # Business logicnpm run dev

│   │   ├── services/                 # Service layer```

│   │   │   ├── document/

│   │   │   ├── signature/Server akan berjalan di **http://localhost:8080**

│   │   │   ├── notification/

│   │   │   └── audit/---

│   │   └── repositories/             # Data access

│   │       ├── document.repository.js## 🗄️ **Database Schema**

│   │       ├── signature.repository.js

│   │       └── signer.repository.js### **Table: documents**

│   ├── infrastructure/               # InfrastructureMenyimpan konfigurasi tipe dokumen untuk setiap prodi.

│   │   ├── database/

│   │   │   └── prisma/| Column | Type | Description |

│   │   │       ├── schema.prisma|--------|------|-------------|

│   │   │       ├── client.js| id | int | Primary key |

│   │   │       └── seeds/| type | string | Jenis dokumen (kkp, surat_tugas, etc) |

│   │   └── storage/| prodi | string | Kode program studi |

│   │       └── local.storage.js| template_path | string | Path ke template .docx |

│   └── shared/                       # Shared components| description | text | Deskripsi dokumen |

│       ├── utils/                    # Utilities| created_at | timestamp | Waktu dibuat |

│       │   ├── logger.util.js

│       │   ├── date.util.js**Unique constraint:** `(type, prodi)` - Satu prodi hanya punya satu template per tipe dokumen.

│       │   ├── crypto.util.js

│       │   └── file.util.js### **Table: document_fields**

│       ├── helpers/                  # HelpersMenyimpan konfigurasi field untuk setiap dokumen.

│       │   ├── document.helper.js

│       │   ├── qrcode.helper.js| Column | Type | Description |

│       │   ├── validation.helper.js|--------|------|-------------|

│       │   └── response.helper.js| id | int | Primary key |

│       └── constants/                # Constants| document_id | int | FK ke documents |

│           ├── status-codes.js| field_name | string | Nama field (kepada, tempat_tujuan, etc) |

│           ├── error-codes.js| field_type | string | Tipe field (string, date_hijriyah, table, etc) |

│           ├── roles.js| is_required | boolean | Apakah field wajib diisi |

│           └── status.js| default_value | text | Nilai default field |

├── storage/                          # Storage directory| created_at | timestamp | Waktu dibuat |

│   ├── templates/                    # Document templates

│   ├── outputs/                      # Generated documents---

│   ├── uploads/                      # Uploaded files

│   ├── qrcodes/                      # QR code images## 🎨 **Field Types yang Didukung**

│   └── signatures/                   # Signature images

├── tests/                            # TestsSistem mendukung berbagai tipe field dengan processing yang sesuai:

│   ├── unit/

│   ├── integration/| Field Type | Description | Contoh Input | Output |

│   └── e2e/|------------|-------------|--------------|--------|

├── docs/                             # Documentation| `string` | Text biasa | "PT. Tech Indonesia" | "PT. Tech Indonesia" |

│   ├── api/| `text` | Text panjang | "Deskripsi proyek..." | "Deskripsi proyek..." |

│   ├── architecture/| `date_hijriyah` | Tanggal Hijriyah | "1445/06/15" | "15 Jumadil Akhir 1445 H" |

│   └── guides/| `date_masehi` | Tanggal Masehi | "2024-01-15" | "2024-01-15" |

├── .eslintrc.js                      # ESLint config| `table` | Array data mahasiswa | `[{nama, nim, semester}]` | `[{no: 1, nama, nim, semester}]` |

├── .prettierrc                       # Prettier config| `array` | Array umum | `["item1", "item2"]` | `["item1", "item2"]` |

├── jest.config.js                    # Jest config| `number` | Angka | 123 | 123 |

├── nodemon.json                      # Nodemon config| `boolean` | True/False | true | true |

└── server.js                         # Entry point

```---



## 🛠️ Available Scripts## 🛠️ **API Endpoints**



### Development### **🔹 Generate Document (Multi-Prodi)**

```bash

npm run dev              # Start development server with auto-reload#### `POST /api/generate-document/{type}/{prodi}`

npm run dev:watch        # Start with Node.js --watch flagGenerate dokumen dengan prodi spesifik.

npm start                # Start production server

```**Example Request:**

```bash

### DatabasePOST /api/generate-document/kkp/informatika

```bashContent-Type: application/json

npm run prisma:generate  # Generate Prisma Client

npm run prisma:migrate   # Run migrations{

npm run prisma:studio    # Open Prisma Studio  "kepada": "PT. Tech Indonesia",

npm run prisma:reset     # Reset database  "tempat_tujuan": "Jakarta",

npm run seed             # Seed database  "tanggal_hijriyah": "1445/06/15",

```  "tanggal_masehi": "2024-01-15",

  "tableData": [

### Code Quality    {

```bash      "nama": "Ahmad Rahman",

npm run lint             # Lint code      "nim": "2019001",

npm run lint:fix         # Lint and fix code      "semester": "6"

npm run format           # Format code with Prettier    }

npm run format:check     # Check code formatting  ]

```}

````

### Testing

````bash**Response:**

npm test                 # Run all tests```json

npm run test:unit        # Run unit tests{

npm run test:integration # Run integration tests  "success": true,

npm run test:e2e         # Run E2E tests  "data": {

npm run test:coverage    # Generate coverage report    "filePath": "/path/to/informatika_kkp_1694168876543.docx",

npm run test:watch       # Run tests in watch mode    "no_surat": "001/KKP/2024",

```    "prodi": "informatika",

    "message": "Dokumen KKP untuk prodi informatika berhasil dibuat"

### Maintenance  }

```bash}

npm run clean            # Clean node_modules and cache```

npm run clean:storage    # Clean storage directories

```### **🔹 Dynamic Field Configuration**



## 🔌 API Endpoints#### `GET /api/document-config/types`

Mendapatkan semua tipe dokumen yang tersedia.

### Documents

```**Response:**

POST   /api/v1/documents/generate         # Generate document```json

GET    /api/v1/documents/:id              # Get document{

GET    /api/v1/documents                  # List documents  "success": true,

DELETE /api/v1/documents/:id              # Delete document  "data": {

```    "kkp": [

      {

### Signatures        "prodi": "informatika",

```        "description": "Template surat KKP untuk Program Studi Informatika",

POST   /api/v1/signatures/sign            # Sign document        "template_path": "templates/informatika/kkp.docx"

POST   /api/v1/signatures/verify          # Verify signature      },

GET    /api/v1/signatures/:docId          # Get document signatures      {

```        "prodi": "elektro",

        "description": "Template surat KKP untuk Program Studi Teknik Elektro",

### Admin        "template_path": "templates/elektro/kkp.docx"

```      }

GET    /api/v1/admin/signers              # List signers    ]

POST   /api/v1/admin/signers              # Create signer  }

PUT    /api/v1/admin/signers/:id          # Update signer}

DELETE /api/v1/admin/signers/:id          # Delete signer```

````

#### `GET /api/document-config/fields/{type}?prodi=xxx`

See [API Documentation](docs/api/) for complete endpoint details.Mendapatkan field yang tersedia untuk tipe dokumen tertentu.

## 🔐 Security**Response:**

````json

- **EdDSA (Ed25519)** for digital signatures{

- **SHA-256** for document hashing  "success": true,

- **AES-256-GCM** for private key encryption  "data": [

- **Rate limiting** to prevent API abuse    {

- **Input validation** at middleware level      "id": 1,

- **Comprehensive audit logging**      "type": "kkp",

      "prodi": "informatika",

See [Security Documentation](docs/architecture/security.md) for details.      "template_path": "templates/informatika/kkp.docx",

      "description": "Template surat KKP untuk Program Studi Informatika",

## 🧪 Testing      "fields": [

        {

```bash          "field_name": "kepada",

# Run all tests          "field_type": "string",

npm test          "is_required": true,

          "default_value": null

# Run with coverage        },

npm run test:coverage        {

          "field_name": "nama_prodi",

# Run specific test suite          "field_type": "string",

npm run test:unit          "is_required": false,

npm run test:integration          "default_value": "Informatika"

npm run test:e2e        },

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
