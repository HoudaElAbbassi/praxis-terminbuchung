/**
 * Zentrales Logging System
 *
 * Verwendung:
 * import { logger } from '@/lib/logger';
 * logger.info('User logged in', { userId: '123' });
 * logger.error('Database error', error);
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private log(level: LogLevel, message: string, context?: LogContext | Error) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...(context instanceof Error
        ? {
            error: {
              message: context.message,
              stack: context.stack,
              name: context.name,
            },
          }
        : context),
    };

    // In Produktion: Strukturiertes JSON-Logging
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(logData));
    } else {
      // In Development: Lesbare Console-Ausgabe
      const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
      console.log(prefix, message, context || '');
    }

    // TODO: Optional - Sende kritische Errors an Monitoring-Service
    // if (level === 'error' && process.env.SENTRY_DSN) {
    //   Sentry.captureException(context);
    // }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error | LogContext) {
    this.log('error', message, error);
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, context);
    }
  }
}

export const logger = new Logger();
