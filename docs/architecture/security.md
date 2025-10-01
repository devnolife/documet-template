# 🔐 Security Documentation

## Digital Signature System

### EdDSA (Edwards-curve Digital Signature Algorithm)

**Overview**: 
- Menggunakan Ed25519 curve
- High security (128-bit security level)
- Fast signature generation and verification
- Deterministic signatures

### Key Generation
```javascript
// Generate new key pair
const { publicKey, privateKey, keyId } = CryptoUtil.generateEdDSAKeyPair();

// Store in database
await prisma.signers.create({
  data: {
    name: 'Dosen Name',
    public_key: publicKey,
    private_key: encryptedPrivateKey, // Encrypted with AES-256-GCM
    key_id: keyId,
  }
});
```

### Signing Process
1. **Document Hash**: Generate SHA-256 hash of document content
2. **Sign Hash**: Sign the hash with signer's private key
3. **Store Signature**: Save signature data to database
4. **Update Status**: Track signature progress

### Verification Process
1. **Retrieve Document**: Get original document and signatures
2. **Verify Hash**: Compare stored hash with current document hash
3. **Verify Signatures**: Verify each signature with signer's public key
4. **Check Integrity**: Ensure all required signatures are present

## Private Key Security

### Encryption at Rest
- Algorithm: **AES-256-GCM**
- Key derivation: **scrypt** with salt
- Authentication tag for integrity verification

### Access Control
- Private keys only accessible during signing operations
- No API endpoint exposes private keys
- Audit log for all key usage

## Document Integrity

### Hashing
- Algorithm: **SHA-256**
- Applied to: Complete document content
- Stored: In `signed_documents.document_hash`

### QR Code Verification
QR codes contain:
```json
{
  "id": "document-uuid",
  "hash": "sha256-hash",
  "signatures": [
    {
      "signer": "signer-info",
      "timestamp": "iso-timestamp",
      "hash": "signature-hash"
    }
  ],
  "verifyUrl": "https://api.example.com/verify/uuid"
}
```

## API Security

### Authentication (Future)
- JWT-based authentication
- Token expiration and refresh
- Role-based access control (RBAC)

### Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Configurable per endpoint
- Prevents brute force attacks

### Input Validation
- Request body validation
- File type and size validation
- SQL injection prevention (via Prisma)
- XSS prevention

### CORS
- Configurable allowed origins
- Credentials support
- Pre-flight request handling

## Audit Trail

### Document History
Every action tracked:
- Document creation
- Signature additions
- Status changes
- Verification attempts

### Verification Logs
Records:
- Verifier IP address
- User agent
- Verification method
- Result (valid/invalid)
- Timestamp

### Audit Logs
System-wide audit:
- Table name
- Record ID
- Operation (INSERT/UPDATE/DELETE)
- Old and new values
- User information
- IP address

## Best Practices

### For Administrators
1. Regularly rotate signing keys (recommended: 90 days)
2. Monitor audit logs for suspicious activity
3. Keep private key encryption password secure
4. Regular database backups
5. Review and update security policies

### For Developers
1. Never log sensitive data (keys, passwords)
2. Use parameterized queries (Prisma handles this)
3. Validate all inputs
4. Follow principle of least privilege
5. Regular security audits

### For Users
1. Protect NBM and credentials
2. Report suspicious activity
3. Verify document authenticity before trusting
4. Use official verification endpoints

## Threat Model

### Identified Threats
1. **Document Tampering**: Mitigated by hash verification
2. **Signature Forgery**: Mitigated by EdDSA cryptography
3. **Private Key Theft**: Mitigated by encryption at rest
4. **Man-in-the-Middle**: Mitigated by HTTPS (deployment requirement)
5. **Replay Attacks**: Mitigated by timestamps and unique IDs

### Security Layers
```
┌─────────────────────────────────────┐
│         HTTPS/TLS Layer             │ ← Transport Security
├─────────────────────────────────────┤
│    Rate Limiting & CORS             │ ← Network Security
├─────────────────────────────────────┤
│  Authentication & Authorization     │ ← Access Control
├─────────────────────────────────────┤
│      Input Validation               │ ← Application Security
├─────────────────────────────────────┤
│   EdDSA Signatures & Hashing        │ ← Cryptographic Security
├─────────────────────────────────────┤
│    Encrypted Private Keys           │ ← Data Security
├─────────────────────────────────────┤
│    Audit Logs & Monitoring          │ ← Operational Security
└─────────────────────────────────────┘
```

## Compliance Considerations

### Data Protection
- Minimal personal data collection
- Secure data storage
- Data retention policies
- User consent management

### Document Authenticity
- Legally-binding digital signatures
- Timestamp authority integration (future)
- Long-term signature validation

## Incident Response

### In Case of Security Breach
1. **Immediate Actions**
   - Isolate affected systems
   - Revoke compromised keys
   - Notify affected parties

2. **Investigation**
   - Review audit logs
   - Identify attack vector
   - Assess damage scope

3. **Recovery**
   - Patch vulnerabilities
   - Restore from backups if needed
   - Regenerate keys

4. **Prevention**
   - Update security policies
   - Implement additional controls
   - Team training

## Security Checklist

- [ ] HTTPS enabled (production)
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] Private keys encrypted
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Audit logging enabled
- [ ] Regular backups scheduled
- [ ] Security monitoring in place
