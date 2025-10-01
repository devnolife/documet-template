/**
 * Document and Process Status Constants
 */
module.exports = {
  // Document Status
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',

  // Priority Levels
  URGENT: 'urgent',
  HIGH: 'high',
  NORMAL: 'normal',
  LOW: 'low',

  // Verification Status
  VERIFIED: 'verified',
  INVALID: 'invalid',
  TAMPERED: 'tampered',

  // Document Types
  KKP: 'kkp',
  KKPLUS: 'kkplus',
  BIMBINGAN: 'bimbingan',

  // Action Types
  CREATED: 'created',
  SIGNED: 'signed',
  UPDATED: 'updated',
  VERIFIED: 'verified',
  DOWNLOADED: 'downloaded',
};
