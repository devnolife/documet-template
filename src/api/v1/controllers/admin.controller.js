/**
 * Admin Controller
 * Handles HTTP requests for administrative operations
 */

const { documentService, signatureService, signerService } = require('../../../core/services');
const { ResponseHelper } = require('../../../shared/helpers');
const { logger } = require('../../../shared/utils');
const { HTTP_STATUS } = require('../../../shared/constants');
const prisma = require('../../../infrastructure/database/prisma');

class AdminController {
  /**
   * Get system statistics
   * GET /api/v1/admin/statistics
   */
  async getStatistics(req, res, next) {
    try {
      logger.info('Fetching system statistics', {
        requestedBy: req.user?.id,
      });

      const [
        totalDocuments,
        totalSignatures,
        totalSigners,
        pendingDocuments,
        completedDocuments,
        activeSigners,
      ] = await Promise.all([
        prisma.documents.count(),
        prisma.document_signatures.count(),
        prisma.signers.count(),
        prisma.documents.count({
          where: { status: 'pending' },
        }),
        prisma.documents.count({
          where: { status: 'completed' },
        }),
        prisma.signers.count({
          where: { status: 'active' },
        }),
      ]);

      const statistics = {
        documents: {
          total: totalDocuments,
          pending: pendingDocuments,
          completed: completedDocuments,
        },
        signatures: {
          total: totalSignatures,
        },
        signers: {
          total: totalSigners,
          active: activeSigners,
        },
        timestamp: new Date().toISOString(),
      };

      return ResponseHelper.success(res, statistics, 'Statistics retrieved successfully');
    } catch (error) {
      logger.error('Error fetching statistics', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Get recent activities
   * GET /api/v1/admin/activities
   */
  async getRecentActivities(req, res, next) {
    try {
      const { limit = 50 } = req.query;

      logger.info('Fetching recent activities', {
        limit,
        requestedBy: req.user?.id,
      });

      const [recentDocuments, recentSignatures] = await Promise.all([
        prisma.documents.findMany({
          take: parseInt(limit) / 2,
          orderBy: { created_at: 'desc' },
          select: {
            id: true,
            type: true,
            prodi: true,
            status: true,
            created_at: true,
          },
        }),
        prisma.document_signatures.findMany({
          take: parseInt(limit) / 2,
          orderBy: { signed_at: 'desc' },
          include: {
            documents: {
              select: {
                type: true,
                prodi: true,
              },
            },
            signers: {
              select: {
                name: true,
                role: true,
              },
            },
          },
        }),
      ]);

      const activities = {
        recentDocuments,
        recentSignatures,
        timestamp: new Date().toISOString(),
      };

      return ResponseHelper.success(res, activities, 'Recent activities retrieved successfully');
    } catch (error) {
      logger.error('Error fetching recent activities', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Get audit logs
   * GET /api/v1/admin/audit-logs
   */
  async getAuditLogs(req, res, next) {
    try {
      const { page = 1, limit = 50, action, userId } = req.query;

      const where = {};
      if (action) where.action = action;
      if (userId) where.user_id = userId;

      const [logs, total] = await Promise.all([
        prisma.audit_logs.findMany({
          where,
          take: parseInt(limit),
          skip: (parseInt(page) - 1) * parseInt(limit),
          orderBy: { created_at: 'desc' },
        }),
        prisma.audit_logs.count({ where }),
      ]);

      const result = {
        data: logs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      };

      return ResponseHelper.success(res, result, 'Audit logs retrieved successfully');
    } catch (error) {
      logger.error('Error fetching audit logs', {
        error: error.message,
        query: req.query,
      });
      next(error);
    }
  }

  /**
   * Get system health
   * GET /api/v1/admin/health
   */
  async getSystemHealth(req, res, next) {
    try {
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        services: {},
      };

      // Check database connection
      try {
        await prisma.$queryRaw`SELECT 1`;
        health.services.database = { status: 'connected' };
      } catch (error) {
        health.services.database = {
          status: 'disconnected',
          error: error.message,
        };
        health.status = 'unhealthy';
      }

      // Check file system
      const fs = require('fs');
      const path = require('path');
      try {
        const templatesDir = path.join(process.cwd(), 'templates');
        const storageDir = path.join(process.cwd(), 'storage');

        health.services.fileSystem = {
          status:
            fs.existsSync(templatesDir) && fs.existsSync(storageDir)
              ? 'accessible'
              : 'inaccessible',
        };
      } catch (error) {
        health.services.fileSystem = {
          status: 'error',
          error: error.message,
        };
        health.status = 'unhealthy';
      }

      const statusCode =
        health.status === 'healthy' ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE;

      return ResponseHelper.success(res, health, `System is ${health.status}`, statusCode);
    } catch (error) {
      logger.error('Error checking system health', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Get documents by prodi
   * GET /api/v1/admin/documents/by-prodi
   */
  async getDocumentsByProdi(req, res, next) {
    try {
      const documentsByProdi = await prisma.documents.groupBy({
        by: ['prodi'],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });

      const result = documentsByProdi.map((item) => ({
        prodi: item.prodi,
        count: item._count.id,
      }));

      return ResponseHelper.success(res, result, 'Documents by prodi retrieved successfully');
    } catch (error) {
      logger.error('Error fetching documents by prodi', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Get documents by type
   * GET /api/v1/admin/documents/by-type
   */
  async getDocumentsByType(req, res, next) {
    try {
      const documentsByType = await prisma.documents.groupBy({
        by: ['type'],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });

      const result = documentsByType.map((item) => ({
        type: item.type,
        count: item._count.id,
      }));

      return ResponseHelper.success(res, result, 'Documents by type retrieved successfully');
    } catch (error) {
      logger.error('Error fetching documents by type', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Clean up old files
   * POST /api/v1/admin/cleanup
   */
  async cleanupOldFiles(req, res, next) {
    try {
      const { daysOld = 30 } = req.body;

      logger.info('Starting cleanup of old files', {
        daysOld,
        initiatedBy: req.user?.id,
      });

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      // Find old documents
      const oldDocuments = await prisma.documents.findMany({
        where: {
          created_at: {
            lt: cutoffDate,
          },
          status: 'completed',
        },
        select: {
          id: true,
          file_path: true,
          qr_code_path: true,
        },
      });

      const fs = require('fs');
      let filesDeleted = 0;

      for (const doc of oldDocuments) {
        try {
          if (doc.file_path && fs.existsSync(doc.file_path)) {
            fs.unlinkSync(doc.file_path);
            filesDeleted++;
          }
          if (doc.qr_code_path && fs.existsSync(doc.qr_code_path)) {
            fs.unlinkSync(doc.qr_code_path);
            filesDeleted++;
          }
        } catch (error) {
          logger.warn('Failed to delete file', {
            documentId: doc.id,
            error: error.message,
          });
        }
      }

      logger.info('Cleanup completed', {
        documentsProcessed: oldDocuments.length,
        filesDeleted,
      });

      return ResponseHelper.success(
        res,
        {
          documentsProcessed: oldDocuments.length,
          filesDeleted,
        },
        'Cleanup completed successfully'
      );
    } catch (error) {
      logger.error('Error during cleanup', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Export data
   * GET /api/v1/admin/export
   */
  async exportData(req, res, next) {
    try {
      const { type = 'documents', format = 'json' } = req.query;

      logger.info('Exporting data', {
        type,
        format,
        requestedBy: req.user?.id,
      });

      let data;

      switch (type) {
        case 'documents':
          data = await prisma.documents.findMany({
            include: {
              document_signatures: {
                include: {
                  signers: {
                    select: {
                      name: true,
                      role: true,
                      prodi: true,
                    },
                  },
                },
              },
            },
          });
          break;
        case 'signers':
          data = await prisma.signers.findMany({
            select: {
              id: true,
              nbm: true,
              name: true,
              role: true,
              prodi: true,
              email: true,
              phone: true,
              position: true,
              status: true,
              created_at: true,
            },
          });
          break;
        case 'signatures':
          data = await prisma.document_signatures.findMany({
            include: {
              documents: {
                select: {
                  type: true,
                  prodi: true,
                },
              },
              signers: {
                select: {
                  name: true,
                  role: true,
                },
              },
            },
          });
          break;
        default:
          return ResponseHelper.error(
            res,
            'Invalid export type',
            HTTP_STATUS.BAD_REQUEST,
            'INVALID_EXPORT_TYPE'
          );
      }

      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${type}-export-${Date.now()}.json"`
        );
        return res.send(JSON.stringify(data, null, 2));
      }

      return ResponseHelper.error(
        res,
        'Unsupported export format',
        HTTP_STATUS.BAD_REQUEST,
        'UNSUPPORTED_FORMAT'
      );
    } catch (error) {
      logger.error('Error exporting data', {
        error: error.message,
        query: req.query,
      });
      next(error);
    }
  }
}

module.exports = new AdminController();
